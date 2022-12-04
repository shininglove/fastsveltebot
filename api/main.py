from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import config
from subscription import api_to_socket_message
from search import find_tier_image, find_raid_image
from utils.models import Tags
from utils.utilities import find_all_sounds, find_command, find_sound_effect, save_message

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

@app.get("/sounds")
def read_sounds():
    sounds = find_all_sounds(100)
    return {"sounds": sounds}


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


@app.post("/user_commands")
async def read_command_list(command_req: Request):
    req = await command_req.json()
    print(req)
    command = find_command(req["command"])
    if command:
        api_to_socket_message(command.message)


@app.post("/add_message")
async def add_message(command_req: Request):
    req = await command_req.json()
    print(req["user"]["badge-info"])
    user_message = save_message(Tags(req["user"]),req["message"])
    return {"first_message": user_message.first_message()}
    


@app.post("/sound_effects")
async def read_sound_info(support: Request):
    req = await support.json()
    print(req)
    sound_name = req.get("sound_name")
    username = req.get("username", None)
    sound_type = req.get("sound_type", "effects")
    print(find_sound_effect(sound_name))
    if sound_name is None:
        return
    if sound_type == "effects" and find_sound_effect(sound_name):
        print(f"{username} played: {sound_name}")
        return req
    if sound_type == "theme" and find_sound_effect(sound_name,"theme"):
        print(f"{username} came through today")
        return req


@app.get("/audio/{audio_type}/{filename}")
def read_data(audio_type: str, filename: str):
    return FileResponse(f"sounds/{audio_type}/{filename}.mp3")
