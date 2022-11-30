import os
from .youtube import check_duration
from logger import logger
import datetime


class SongDetails:
    def __init__(self, data):
        self.data = data
        self.id = data.get("_id")
        self.title = data.get("title")
        self.video_id = data.get("videoId")
        self.duration = self.parse_duration(data.get("duration", 0))
        self.user = data.get("user", {"displayName": "You"}).get("displayName")
        self.channel = data.get("channel")
        self.position: int = 0

    @staticmethod
    def parse_duration(duration):
        raw_duration = datetime.timedelta(seconds=int(duration))
        _, mins, secs = str(raw_duration).split(":")
        return f"{mins} mins {secs} secs"

    def message(self):
        user_message = f'Song Posted. @{self.user} added {self.channel} - "{self.title}" to queue at #{self.position} ({self.duration})'
        return user_message

    def current_message(self):
        user_message = f'@{self.user}, Song: {self.channel} - "{self.title}" to queue ({self.duration}) by {self.data["user"]["username"]}'
        return user_message

class ChatSound:
    def __init__(self, name, url, start, end, sound_type="sound"):
        self.name = self.validate_name(name)
        self.url = self.validate_url(url)
        self.start = self.parse_time(start)
        self.end = self.parse_time(end)
        self.type = sound_type

    def parse_time(self, time_command):
        self.validate_time(time_command)
        mins, secs = time_command.split(":")
        minutes_in_seconds = int(mins) * 60
        seconds = int(secs)
        return minutes_in_seconds + seconds

    def validate_time(self, time_command):
        if ":" not in time_command:
            raise ValueError("Invalid time format")
        return time_command

    def validate_url(self, url_name):
        valid = False
        correct_urls = ["youtube", "youtu.be", "clips.twitch.tv", "www.twitch.tv"]
        for correct in correct_urls:
            if correct in url_name:
                valid = True
        if not valid:
            raise ValueError("Invalid Url Error.")
        return url_name

    def validate_name(self, name):
        parsed_name = name.replace("_", "")
        if any(not part.isalnum() for part in parsed_name):
            raise ValueError("Invalid Name w/ characters.")
        return name.lower()

    def valid_sound_duration(self):
        if "twitch" in self.url:
            return True
        max_duration = int(os.getenv("MAX_SOUND_DURATION","10")) * 60
        max_play_length = int(os.getenv("MAX_ALLOWED_PLAY_LENGTH","10"))
        if self.start > self.end:
            return False
        if self.end > max_duration:
            logger.debug(f"End:{self.end}")
            return False
        if (self.end - self.start) > max_play_length:
            logger.debug(f"Length: {self.end - self.start}")
            return False
        if "youtu.be" in self.url:
            video_id = self.url.split("/")[-1]
        else:
            url_base = self.url.split("?")[-1].split("&")
            _, video_id = url_base[0].split("=")
        vid_duration = check_duration(video_id)
        if vid_duration is None:
            return False
        if vid_duration > max_duration:
            logger.debug(f"Vid Duration: {vid_duration}")
            return False
        logger.debug(f"MAX:{vid_duration} START:{self.start} END:{self.end} ")
        if self.start > vid_duration or self.end > vid_duration:
            logger.debug("Length doesn't make sense")
            return False
        return True
