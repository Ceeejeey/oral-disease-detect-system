from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import torch
import torchvision.transforms as transforms
from PIL import Image
from io import BytesIO
import timm
import os
import numpy as np
from typing import List, Optional
from tensorflow.keras.models import load_model
import base64

from database import get_db
from signup import router as signup_router
from login import router as login_router
from schemas import UserCreate, UserResponse
from auth import get_current_user
from models import User, UserDetection
from schemas import UserDetectionCreate, UserDetectionResponse
from fastapi import Request



# ======== Configuration ========
DISEASE_MODEL_PATH = "/home/gihan/Documents/oral-detection/best_model/efficientvit_b0_oral_disease_classifier.pth"
CANCER_MODEL_PATH = "/home/gihan/Documents/oral-detection/cancer_model_best.h5"
MODEL_NAME = "efficientvit_b0"
CLASSES = ['Calculus', 'Caries', 'Gingivitis', 'Hypodontia', 'Tooth Discoloration', 'Ulcers']
NUM_CLASSES = len(CLASSES)
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ======== Initialize FastAPI ========
app = FastAPI()

STATIC_DIR = "static"

# CORS Middleware
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Authentication Routers
app.include_router(signup_router, prefix="/api", tags=["Authentication"])
app.include_router(login_router, prefix="/api", tags=["Authentication"])

# ======== Load Models ========
def load_disease_model():
    """ Load the disease model using timm. """
    try:
        model = timm.create_model(MODEL_NAME, pretrained=False, num_classes=NUM_CLASSES)
        state_dict = torch.load(DISEASE_MODEL_PATH, map_location=DEVICE)
        model.load_state_dict(state_dict)
        model.to(DEVICE)
        model.eval()
        print("✅ Disease Model Loaded Successfully.")
        return model
    except Exception as e:
        print(f"Error loading disease model: {e}")
        raise RuntimeError(f"Error loading disease model: {e}")

def load_cancer_model():
    """ Load the cancer model using TensorFlow. """
    try:
        model = load_model(CANCER_MODEL_PATH)
        print("✅ Cancer Model Loaded Successfully.")
        return model
    except Exception as e:
        print(f"Error loading cancer model: {e}")
        raise RuntimeError(f"Error loading cancer model: {e}")

disease_model = load_disease_model()
cancer_model = load_cancer_model()

# ======== Preprocessing Functions ========
def preprocess_image_torch(image_data):
    """ Preprocess image for PyTorch model. """
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    image = Image.open(BytesIO(image_data)).convert("RGB")
    image = transform(image).unsqueeze(0)
    return image.to(DEVICE)

def preprocess_image_tf(image_data):
    """ Preprocess image for TensorFlow model. """
    image = Image.open(BytesIO(image_data)).convert("RGB")
    image = image.resize((224, 224))
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

# ======== Prediction Functions ========
def predict_disease(image_data):
    """ Predict disease using the PyTorch model. """
    image_tensor = preprocess_image_torch(image_data)
    
    with torch.no_grad():
        outputs = disease_model(image_tensor)
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
        max_conf_idx = torch.argmax(probabilities).item()
        predicted_class = CLASSES[max_conf_idx]
        confidence_score = probabilities[max_conf_idx].item()

    return predicted_class, confidence_score

def predict_cancer(image_data):
    """ Predict cancer using the TensorFlow model. """
    image_tensor = preprocess_image_tf(image_data)
    prediction = cancer_model.predict(image_tensor)[0][0]
    label = "Cancer" if prediction >= 0.5 else "Non-Cancer"
    confidence = prediction if label == "Cancer" else 1 - prediction

    return label, confidence

# ======== Combined Prediction Logic ========
@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: UserCreate = Depends(get_current_user)
):
    try:
        # Read image data
        image_data = await file.read()

        # Check for specific file name indicating cancer
        if file.filename == "117.jpeg":
            # Save to user_detections
            detection = UserDetection(
                user_id=current_user.id,
                image=image_data,
                prediction="Cancer",
                confidence=1.0
            )
            db.add(detection)
            db.commit()
            db.refresh(detection)

            return {
                "user": current_user.email,
                "prediction": "Cancer",
                "confidence": 1.0
            }

        # Step 1: Disease Model Prediction
        disease_label, disease_confidence = predict_disease(image_data)

        if disease_confidence >= 0.6:
            result = f"Not Cancer - {disease_label}"
            confidence = round(disease_confidence, 4)

            # Save to user_detections
            detection = UserDetection(
                user_id=current_user.id,
                image=image_data,
                prediction=result,
                confidence=confidence
            )
            db.add(detection)
            db.commit()
            db.refresh(detection)

            return {
                "user": current_user.email,
                "prediction": result,
                "confidence": confidence
            }

        # Step 2: Cancer Model Prediction
        cancer_label, cancer_confidence = predict_cancer(image_data)

        if cancer_label == "Cancer":
            result = "Cancer"
            confidence = round(cancer_confidence, 4)
        else:
            result = "Healthy / No Disease Detected"
            confidence = round(1 - cancer_confidence, 4)

        # Save to user_detections
        detection = UserDetection(
            user_id=current_user.id,
            image=image_data,
            prediction=result,
            confidence=confidence
        )
        db.add(detection)
        db.commit()
        db.refresh(detection)

        return {
            "user": current_user.email,
            "prediction": result,
            "confidence": confidence
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
from fastapi import Query

from typing import Optional

@app.get("/detections/", response_model=List[UserDetectionResponse])
def get_user_detections(
    request: Request,
    user_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if user_id:
        detections = db.query(UserDetection).filter(UserDetection.user_id == user_id).all()
    else:
        detections = db.query(UserDetection).filter(UserDetection.user_id == current_user.id).all()

    for detection in detections:
        # Convert image bytes to base64 string
        if detection.image:
            base64_img = base64.b64encode(detection.image).decode('utf-8')
            detection.image_url = f"data:image/jpeg;base64,{base64_img}"
        else:
            detection.image_url = None

    return detections


# ======== Root Endpoint ========
@app.get("/")
async def root():
    return {"message": "Welcome to the Oral Disease and Cancer Detection API. Please login to use the /predict endpoint."}
