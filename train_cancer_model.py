import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model, load_model
import os

# Paths
base_path = "/home/gihan/Documents/oral-detection"
train_dir = os.path.join(base_path, "split_cancer_dataset", "train")
val_dir = os.path.join(base_path, "split_cancer_dataset", "val")
test_dir = os.path.join(base_path, "split_cancer_dataset", "test")
img_size = (224, 224)
batch_size = 32

# Data augmentation for training
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True
)

# Only rescaling for validation and test
val_test_datagen = ImageDataGenerator(rescale=1./255)

# ===============================
# Data Generators
# ===============================

# Training data generator
train_cancer_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='binary'
)

# Validation data generator
val_cancer_generator = val_test_datagen.flow_from_directory(
    val_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='binary'
)

# Test data generator
test_cancer_generator = val_test_datagen.flow_from_directory(
    test_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='binary'
)

# ===============================
# Load the Best Model
# ===============================
print("Loading the best model for evaluation...")
best_model_path ="/home/gihan/Documents/oral-detection/cancer_model_best.h5"
best_model = load_model(best_model_path)

# ===============================
# Evaluation
# ===============================

# Evaluate on training set
print("\nEvaluating on training set...")
train_loss, train_acc, train_recall, train_precision = best_model.evaluate(train_cancer_generator, verbose=2)
print(f"Training Accuracy: {train_acc:.4f}")
print(f"Training Recall: {train_recall:.4f}")
print(f"Training Precision: {train_precision:.4f}")

# Evaluate on validation set
print("\nEvaluating on validation set...")
val_loss, val_acc, val_recall, val_precision = best_model.evaluate(val_cancer_generator, verbose=2)
print(f"Validation Accuracy: {val_acc:.4f}")
print(f"Validation Recall: {val_recall:.4f}")
print(f"Validation Precision: {val_precision:.4f}")

# Evaluate on test set
print("\nEvaluating on test set...")
test_loss, test_acc, test_recall, test_precision = best_model.evaluate(test_cancer_generator, verbose=2)
print(f"Test Accuracy: {test_acc:.4f}")
print(f"Test Recall: {test_recall:.4f}")
print(f"Test Precision: {test_precision:.4f}")
