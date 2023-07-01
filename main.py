from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

class Chat(BaseModel):
    id: str
    content: str

chats = []

app = FastAPI()

@app.post("/chats")
def create_chat(chat: Chat):
    chats.append(chat)
    return "내용을 성공적으로 보냈습니다."

@app.get("/chats")
def read_chat():
    return chats

app.mount("/", StaticFiles(directory='static', html=True), name='static')