# import os
# import numpy as np
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing.image import load_img, img_to_array

# # ========== Paths ==========
# base_path = "/home/gihan/Documents/oral-detection"
# test_image_path = os.path.join(base_path, "200.jpeg")  # Change as needed
# cancer_model_path = os.path.join(base_path, "cancer_model_best.h5")

# # ========== Parameters ==========
# img_size = (224, 224)

# # ========== Confidence Thresholds ==========
# # Adjusted confidence thresholds
# STRONG_CANCER_THRESHOLD = 0.75  # Very confident cancer
# UNCERTAIN_THRESHOLD = 0.5       # Uncertain range

# # ========== Load Cancer Model ==========
# try:
#     cancer_model = load_model(cancer_model_path)
#     print("✅ Cancer Model Loaded Successfully")
# except Exception as e:
#     print(f"Error loading cancer model: {e}")
#     exit()

# # ========== Preprocessing Function ==========
# def preprocess_image(image_path):
#     """ Preprocess the image for Cancer Model prediction. """
#     try:
#         image = load_img(image_path, target_size=img_size)
#         image_array = img_to_array(image) / 255.0
#         image_array = np.expand_dims(image_array, axis=0)
#         return image_array
#     except Exception as e:
#         print(f"Error in preprocessing image: {e}")
#         return None

# # ========== Confidence Adjuster ==========
# def adjust_confidence(score):
#     """
#     Adjusts the confidence score by compressing high values and expanding low values.
#     """
#     # If the score is very high, reduce it slightly to mitigate overconfidence
#     if score >= 0.85:
#         return 0.7 + (score - 0.85) * 0.3  # Compress high values
#     elif score >= 0.6:
#         return 0.4 + (score - 0.6) * 0.5  # Compress medium values
#     else:
#         return score  # Keep low values as they are

# # ========== Prediction Function ==========
# def predict_cancer(image_path):
#     """ Predict using Cancer Model with adaptive logic. """
#     image = preprocess_image(image_path)
#     if image is None:
#         print("Error in preprocessing the image.")
#         return
    
#     try:
#         # Raw Prediction
#         raw_score = cancer_model.predict(image)[0][0]

#         # Adjusted Confidence Score
#         adjusted_score = adjust_confidence(raw_score)

#         # Decision Logic
#         if adjusted_score >= STRONG_CANCER_THRESHOLD:
#             label = "Cancer"
#             confidence = adjusted_score
#         elif UNCERTAIN_THRESHOLD <= adjusted_score < STRONG_CANCER_THRESHOLD:
#             label = "Uncertain - Send to Disease Model"
#             confidence = adjusted_score
#         else:
#             label = "Healthy / Not Cancer"
#             confidence = 1 - adjusted_score

#         # Output the result
#         print(f"\n🔍 Raw Score: {raw_score:.4f}")
#         print(f"🔍 Adjusted Score: {adjusted_score:.4f}")
#         print(f"Label: {label}")
#         print(f"Confidence: {confidence:.4f}")

#     except Exception as e:
#         print(f"Error during prediction: {e}")

# # ========== Run Test ==========
# if __name__ == "__main__":
#     print(f"\n🖼️ Testing with Image: {test_image_path}")
#     predict_cancer(test_image_path)
