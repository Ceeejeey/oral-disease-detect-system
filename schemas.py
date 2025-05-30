from pydantic import BaseModel, EmailStr, constr
from typing import Optional
from datetime import datetime

# ======== User Base Schema ========
class UserBase(BaseModel):
    name: str
    email: EmailStr
    telephone: constr(min_length=10, max_length=15)
    age: int
    gender: str
    location: str

# ======== User Create Schema ========
class UserCreate(UserBase):
    password: constr(min_length=6)

# ======== User Response Schema ========
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    telephone: str
    age: int
    gender: str
    location: str

    class Config:
        orm_mode = True

# ======== Login Schema ========
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# ======== Token Schema ========
class Token(BaseModel):
    access_token: str
    token_type: str

# ======== Token With User Schema ========
class TokenWithUser(Token):
    user: UserResponse

# ======== User Detection Schema ========
class UserDetectionBase(BaseModel):
    prediction: str
    confidence: float

class UserDetectionCreate(UserDetectionBase):
    image: bytes  # Expecting image in bytes during creation

class UserDetectionResponse(BaseModel):
    id: int
    user_id: int
    prediction: str
    confidence: float
    detected_at: datetime
    image_url: Optional[str]  # base64-encoded image

    class Config:
        orm_mode = True
