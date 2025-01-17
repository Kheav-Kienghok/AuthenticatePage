from sqlalchemy import Column, Integer, String
from database import Base
from database import engine

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)

# Create the databases tables if they don't exists
User.metadata.create_all(bind=engine)

