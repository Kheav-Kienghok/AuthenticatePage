from pydantic import BaseModel, EmailStr, FieldValidationInfo, field_validator

class UserCreate(BaseModel):
    username: str
    password: str


class RegisterUser(BaseModel):
    username: str
    email: EmailStr
    password: str
    confirm_password: str

    @field_validator("confirm_password")
    def passwords_match(cls, confirm_password: str, info: FieldValidationInfo):
        if "password" in info.data and confirm_password != info.data["password"]:
            raise ValueError("Passwords do not match")
        return confirm_password