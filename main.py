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

@app.put("/chats/{chat_id}")
def put_chat(req_chat: Chat):
    for chat in chats:
        if chat.id == req_chat.id:
            chat.content = req_chat.content
            return '내용을 성공적으로 수정했습니다.'
    return '해당 메모는 존재하지 않습니다. 수정에 실패했습니다.'

@app.delete("/chats/{chat_id}")
def delete_chat(chat_id):
    for index, chat in enumerate(chats):
        if chat.id == chat_id:
            chats.pop(index)
            return "내용 삭제에 성공했습니다."
    return "해당 메모는 존재하지 않습니다. 삭제에 실패했습니다."

app.mount("/", StaticFiles(directory='static', html=True), name='static')