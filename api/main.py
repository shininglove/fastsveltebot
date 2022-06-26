from typing import Optional
from fastapi import APIRouter
from fastapi.responses import FileResponse

app = APIRouter(prefix='/api')

@app.get("/")
def read_root():
    return {"name": "Party People"}

@app.get("/data")
def read_data():
    return {"name": "Developers"}

@app.get("/files")
def read_files():
    return {
        "img" : "http://www.clker.com/cliparts/7/7/e/b/1513742325792949782commensalism-examples.hi.png"
    }

@app.get("/audio/{filename}")
def read_data(filename:str):
    return FileResponse(f"sounds/effects/{filename}.mp3")
