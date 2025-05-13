import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model

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

# Create data generators
train_cancer_generator = train_datagen.flow_from_directory(
    'split_cancer_dataset/train',
    target_size=(224, 224),
    batch_size=32,
    class_mode='binary'
)

val_cancer_generator = val_test_datagen.flow_from_directory(
    'split_cancer_dataset/val',
    target_size=(224, 224),
    batch_size=32,
    class_mode='binary'
)

test_cancer_generator = val_test_datagen.flow_from_directory(
    'split_cancer_dataset/test',
    target_size=(224, 224),
    batch_size=32,
    class_mode='binary'
)

# Create the cancer detection model
base_model = EfficientNetB0(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# Freeze the base model layers
for layer in base_model.layers:
    layer.trainable = False

# Add custom layers
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dropout(0.5)(x)
x = Dense(256, activation='relu')(x)
predictions = Dense(1, activation='sigmoid')(x)

cancer_model = Model(inputs=base_model.input, outputs=predictions)

# Compile the model
cancer_model.compile(
    optimizer=tf.keras.optimizers.Adam(1e-4),
    loss='binary_crossentropy',
    metrics=['accuracy', tf.keras.metrics.Recall(), tf.keras.metrics.Precision()]
)

# Set up callbacks
callbacks = [
    tf.keras.callbacks.ModelCheckpoint('cancer_model_best.h5', save_best_only=True, monitor='val_accuracy'),
    tf.keras.callbacks.EarlyStopping(monitor='val_accuracy', patience=10, restore_best_weights=True),
    tf.keras.callbacks.ReduceLROnPlateau(monitor='val_loss', factor=0.2, patience=5, min_lr=1e-6)
]

# Train the initial model
print("Training cancer detection model (first phase)...")
history = cancer_model.fit(
    train_cancer_generator,
    validation_data=val_cancer_generator,
    epochs=20,
    callbacks=callbacks
)

# Unfreeze some layers for fine-tuning
for layer in base_model.layers[-20:]:
    layer.trainable = True

# Recompile with lower learning rate for fine-tuning
cancer_model.compile(
    optimizer=tf.keras.optimizers.Adam(1e-5),
    loss='binary_crossentropy',
    metrics=['accuracy', tf.keras.metrics.Recall(), tf.keras.metrics.Precision()]
)

# Fine-tune the model
print("Fine-tuning cancer detection model...")
history_fine = cancer_model.fit(
    train_cancer_generator,
    validation_data=val_cancer_generator,
    epochs=30,
    callbacks=callbacks,
    initial_epoch=history.epoch[-1]
)

# Save the final model
cancer_model.save('cancer_detection_final.h5')

# Evaluate on test set
print("Evaluating cancer detection model...")
test_loss, test_acc, test_recall, test_precision = cancer_model.evaluate(test_cancer_generator)
print(f"Test accuracy: {test_acc:.4f}")
print(f"Test recall: {test_recall:.4f}")
print(f"Test precision: {test_precision:.4f}")