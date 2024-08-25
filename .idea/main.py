from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from typing import List, Union
import re

app = FastAPI()

class PostRequest(BaseModel):
    data: List[Union[str, int]]

@app.post("/bfhl")
def process_data(request: PostRequest):
    # Mock user data, replace with real values in a real application
    user_id = "john_doe_17091999"
    email = "john@xyz.com"
    roll_number = "ABCD123"

    numbers = [str(item) for item in request.data if isinstance(item, int) or re.match(r'^\d+$', str(item))]
    alphabets = [item for item in request.data if isinstance(item, str) and item.isalpha()]
    lowercase_alphabets = sorted([item for item in alphabets if item.islower()])
    highest_lowercase_alphabet = lowercase_alphabets[-1] if lowercase_alphabets else ""

    response = {
        "is_success": True,
        "user_id": user_id,
        "email": email,
        "roll_number": roll_number,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highest_lowercase_alphabet
    }

    return response

@app.get("/bfhl")
def get_operation_code():
    return {"operation_code": 1}
