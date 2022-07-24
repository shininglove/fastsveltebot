from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"name": "Party People"}


@app.post("/support")
async def read_support(support: Request):
    req = await support.json()
    print(req)
    return {
        "img": "https://i.redd.it/6x9qh7b1st1y.jpg",
        "subtext": "CottonCandy",
        "message": "Domain Expansion",
    }


@app.get("/data")
def read_data():
    return {"name": "YamateTheKudasai", "song": "MyLittlePonysPlayalong"}


@app.get("/files")
def read_files():
    return {"img": "https://i.redd.it/6x9qh7b1st1y.jpg"}


@app.get("/audio/{support_name}/{filename}")
def read_data(support_name: str,filename: str):
    if filename in ["Bob", "Richard", "Matt", "Tom"]:
        if support_name == "sub":
            filename = "dog"
        else:
            filename = "butter"
    return FileResponse(f"sounds/effects/{filename}.mp3")
