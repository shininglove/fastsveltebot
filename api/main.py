from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import config
from subscription import api_to_socket_message
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


@app.post("/user_commands")
async def read_command_list(command_req: Request):
    req = await command_req.json()
    print(req)
    command_list = {
        "discord": "Here's a link to the discord: 🐒",
        "songs" : "Song list here is: 🐵",
        "who" : "I'm the sign of: 🍖"
    }
    command = command_list.get(req["command"])
    if command:
        api_to_socket_message(command)

all_commands = {}

@app.post("/add_command")
async def add_command(command_req: Request):
    req = await command_req.json()
    print(req)
    command = all_commands.update(req)
    print(all_commands)


@app.post("/sound_effects")
async def read_data(support: Request):
    req = await support.json()
    print(req)
    sound_name = req.get("sound_name")
    username = req.get("username", "no-username")
    sound_type = req.get("sound_type", "effects")
    if sound_name is None:
        return
    files = Path(f'sounds/{sound_type}').glob('*.mp3')
    mp3_file = [file.name for file in files if file.name == f"{sound_name}.mp3"]
    if mp3_file:
        name = mp3_file[0].replace(".mp3", "")
        return req
    

@app.get("/audio/{audio_type}/{filename}")
def read_data(audio_type: str,filename: str):
    return FileResponse(f"sounds/{audio_type}/{filename}.mp3")
