import Pusher from 'pusher';
import 'dotenv/config';
import type { supportMap, userState } from '$root/types/twitch';

let pusher = new Pusher({
	appId: process.env.SOKETI_APP_ID || '',
	key: process.env.SOKETI_KEY || '',
	secret: process.env.SOKETI_SECRET || '',
	useTLS: process.env.SOKETI_SSL === 'true',
	host: process.env.SOKETI_HOST || 'localhost',
	port: `${process.env.SOKETI_PORT}`
});

let chatroom = 'chat-room';

export const publishMessage = (message: userState) => {
	pusher.trigger(chatroom, 'message', message);
};

export const publishSub = (submessage: supportMap) => {
	pusher.trigger(chatroom, 'submessage', submessage);
};
