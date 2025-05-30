from sqlalchemy import Column, String, Integer, ForeignKey, LargeBinary, Float, DateTime, func
from sqlalchemy.orm import relationship
from database import Base
from auth import hash_password, verify_password

# ======== User Model ========
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    telephone = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)
    location = Column(String, nullable=False)
    password = Column(String, nullable=False)

    detections = relationship("UserDetection", back_populates="user", cascade="all, delete-orphan")

    def set_password(self, password: str):
        """ Hash and set the password """
        self.password = hash_password(password)

    def check_password(self, password: str) -> bool:
        """ Verify the password """
        return verify_password(password, self.password)

# ======== User Detection Model ========
class UserDetection(Base):
    __tablename__ = "user_detections"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    image = Column(LargeBinary, nullable=False)
    prediction = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    detected_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="detections")
