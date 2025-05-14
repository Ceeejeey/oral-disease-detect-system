from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import load_model

import os

# Paths
base_path = "/home/gihan/Documents/oral-backend"
train_dir = os.path.join(base_path, "split_cancer_dataset", "train")
val_dir = os.path.join(base_path, "split_cancer_dataset", "val")
img_size = (224, 224)
batch_size = 32

# Data Generators
datagen = ImageDataGenerator(rescale=1./255)

train_gen = datagen.flow_from_directory(
    train_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical',
    shuffle=False
)

val_gen = datagen.flow_from_directory(
    val_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical',
    shuffle=False
)

# Load the model
model_path = "/home/gihan/Documents/oral-detection/cancer_model_best.h5"
model = load_model(model_path)

# Evaluate the model on training data
train_loss, train_acc = model.evaluate(train_gen, verbose=2)
print(f"Training Accuracy: {train_acc:.4f}")

# Evaluate the model on validation data
val_loss, val_acc = model.evaluate(val_gen, verbose=2)
print(f"Validation Accuracy: {val_acc:.4f}")
