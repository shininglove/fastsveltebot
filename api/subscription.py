from pusher import Pusher
import config

client = Pusher(
    app_id = config.SOCK_ID, 
    key=config.SOCK_KEY, 
    secret=config.SOCK_SECRET,
    ssl=config.SOCK_SSL == 'true',
    host=config.SOCK_HOST,
    port=int(config.SOCK_PORT)
)

def api_to_socket_message(message: str):
    client.trigger('chat-room', 'response', message)