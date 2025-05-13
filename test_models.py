# import os
# import numpy as np
# import matplotlib.pyplot as plt
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing.image import load_img, img_to_array
# from sklearn.metrics import confusion_matrix, classification_report
# import seaborn as sns

# # ========== Paths ==========
# base_path = "/home/gihan/Documents/oral-detection"
# test_image_path = os.path.join(base_path, "images (1).jpeg")
# cancer_model_path = os.path.join(base_path, "cancer_model_best.h5")
# disease_model_path = os.path.join(base_path, "best_model/efficientvit_b0_oral_disease_classifier.pth")

# # ========== Parameters ==========
# img_size = (224, 224)

# # ========== Load Models ==========
# print("\n🔄 Loading Models...")
# try:
#     # Load Cancer Model (TensorFlow)
#     cancer_model = load_model(cancer_model_path)
#     print("✅ Cancer Model Loaded Successfully")

#     # Load Disease Model (PyTorch)
#     import torch
#     import torchvision.transforms as transforms
#     from PIL import Image
#     import timm

#     device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
#     disease_classes = ['Calculus', 'Caries', 'Gingivitis', 'Hypodontia', 'Tooth Discoloration', 'Ulcers']

#     def load_disease_model():
#         model = timm.create_model("efficientvit_b0", pretrained=False, num_classes=len(disease_classes))
#         model.load_state_dict(torch.load(disease_model_path, map_location=device))
#         model.to(device)
#         model.eval()
#         print("✅ Disease Model Loaded Successfully")
#         return model

#     disease_model = load_disease_model()

# except Exception as e:
#     print(f"Error loading models: {e}")
#     exit()

# # ========== Preprocessing Functions ==========
# def preprocess_image_tf(image_path):
#     """ Preprocess the image for TensorFlow model. """
#     try:
#         image = load_img(image_path, target_size=img_size)
#         image_array = img_to_array(image) / 255.0
#         image_array = np.expand_dims(image_array, axis=0)
#         return image_array
#     except Exception as e:
#         print(f"Error in preprocessing image for TensorFlow: {e}")
#         return None

# def preprocess_image_torch(image_path):
#     """ Preprocess the image for PyTorch model. """
#     transform = transforms.Compose([
#         transforms.Resize(256),
#         transforms.CenterCrop(224),
#         transforms.ToTensor(),
#         transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
#     ])
#     image = Image.open(image_path).convert("RGB")
#     image = transform(image).unsqueeze(0)
#     return image.to(device)

# # ========== Prediction Functions ==========
# def predict_disease(image_path):
#     """ Predict using Disease Model (PyTorch). """
#     image = preprocess_image_torch(image_path)
    
#     with torch.no_grad():
#         outputs = disease_model(image)
#         probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
#         max_conf_idx = torch.argmax(probabilities).item()
#         predicted_class = disease_classes[max_conf_idx]
#         confidence_score = probabilities[max_conf_idx].item()

#     print(f"\n🔍 Disease Prediction: {predicted_class}")
#     print(f"Confidence Score: {confidence_score:.4f}")
#     return predicted_class, confidence_score

# def predict_cancer(image_path):
#     """ Predict using Cancer Model (TensorFlow). """
#     image = preprocess_image_tf(image_path)
#     if image is None:
#         return "Error", 0.0

#     prediction = cancer_model.predict(image)[0][0]
#     label = "Cancer" if prediction >= 0.5 else "Non-Cancer"
#     confidence = prediction if label == "Cancer" else 1 - prediction

#     print(f"\n🔍 Cancer Prediction: {label}")
#     print(f"Confidence Score: {confidence:.4f}")
#     return label, confidence

# # ========== Combined Prediction Logic ==========
# def combined_prediction(image_path):
#     """ Execute the combined disease and cancer model predictions. """
#     print(f"\n🖼️ Testing Image: {image_path}")

#     # Step 1: Disease Model Prediction
#     disease_label, disease_confidence = predict_disease(image_path)

#     # If the disease model is confident enough, skip cancer model
#     if disease_confidence >= 0.6:
#         print(f"\n🟢 Disease Model Confidently Predicted: {disease_label} with confidence {disease_confidence:.2f}")
#         final_label = f"Not Cancer - {disease_label}"
#         confidence = disease_confidence
#     else:
#         print("\n🔄 Disease Model Uncertain. Proceeding to Cancer Model...")
#         # Step 2: Cancer Model Prediction
#         cancer_label, cancer_confidence = predict_cancer(image_path)

#         if cancer_label == "Cancer":
#             final_label = "Cancer"
#             confidence = cancer_confidence
#         else:
#             final_label = "Healthy / No Disease Detected"
#             confidence = 1 - cancer_confidence

#     print(f"\n🔍 Final Prediction: {final_label}")
#     print(f"Confidence: {confidence:.2f}")

#     # Display the image with the final prediction
#     plt.imshow(load_img(image_path))
#     plt.title(f"Prediction: {final_label} ({confidence:.2f})")
#     plt.axis('off')
#     plt.show()

# # ========== Run Test ==========
# if __name__ == "__main__":
#     combined_prediction(test_image_path)
