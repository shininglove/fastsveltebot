from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import config
# from subscription import api_to_socket_message
from search import find_tier_image, find_raid_image

app = FastAPI()

origins = [config.CORS_HOST]

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


@app.post("/user_support/{event_name}")
async def read_support(event_name: str, support: Request):
    req = await support.json()
    print(req)
    if event_name == "sub":
        user_plan = req.get("methods", {"plan": "0"}).get("plan", "1000")
        tiers = {"1000": "tier 1", "2000": "tier 2", "3000": "tier 3", "Prime": "prime"}
        user_tier = tiers.get(user_plan, "tier 0")
        return {
            "img": find_tier_image(user_plan),
            "subtext": f"{req['message']}",
            "message": f"{req['username']} has subbed w/ {user_tier}",
            "audio_path": "dog",
        }
    viewers = int(req["viewers"])
    return {
        "img": find_raid_image(viewers),
        "subtext": f"Check them out please!",
        "message": f"{req['username']} has raided w/ {viewers} viewers",
        "audio_path": "chc",
    }


@app.get("/data")
def read_data():
    return {"name": "YamateTheKudasai", "song": "MyLittlePonysPlayalong"}


@app.post("/sound_effects")
async def read_data(support: Request):
    req = await support.json()
    print(req)
    sound_name = req.get("sound_name", "coom")
    username = req.get("username", "Karen")
    sound_type = req.get("sound_type", "effects")
    files = Path(f'sounds/{sound_type}').glob('*.mp3')
    mp3_file = [file.name for file in files if file.name == f"{sound_name}.mp3"]
    if mp3_file:
        name = mp3_file[0].replace(".mp3", "")
        return {"user": username,"sound": name}
    

@app.get("/audio/{audio_type}/{filename}")
def read_data(audio_type: str,filename: str):
    return FileResponse(f"sounds/{audio_type}/{filename}.mp3")
