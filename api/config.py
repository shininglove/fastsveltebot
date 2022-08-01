import os
from dotenv import load_dotenv

load_dotenv()

CORS_HOST = os.getenv("CORS_HOST")

SOCK_ID = os.getenv("SOKETI_APP_ID")
SOCK_KEY = os.getenv("SOKETI_KEY")
SOCK_SECRET = os.getenv("SOKETI_SECRET")
SOCK_PORT = os.getenv("SOKETI_PORT")
SOCK_HOST = os.getenv("SOKETI_HOST")
SOCK_SSL = os.getenv("SOKETI_SSL")
