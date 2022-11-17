import Pusher from 'pusher';
import 'dotenv/config';
import type { userState } from '$src/lib/twitch';

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

export const publishSub = (submessage: string) => {
	pusher.trigger(chatroom, 'submessage', submessage);
};

export const publishServer = (response: string) => {
	// here as an option for server-side connection to IRC
	pusher.trigger(chatroom, 'response', response);
};
