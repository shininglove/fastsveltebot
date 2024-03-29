import Pusher from 'pusher';
import 'dotenv/config';
import type { userState } from '$src/lib/twitch';

let pusher = new Pusher({
	appId: process.env.SOKETI_APP_ID || '',
	key: process.env.SOKETI_KEY || '',
	secret: process.env.SOKETI_SECRET || '',
	useTLS: process.env.SOKETI_SSL === 'true',
	cluster: 'us2'
	// host: process.env.SOKETI_HOST || 'localhost',
	// port: `${process.env.SOKETI_PORT}`
});

let chatroom = 'chat-room';

export const publishMessage = (message: userState) => {
	console.log(`Message has been submitted`)
	pusher.trigger(chatroom, 'message', message);
};

export const publishSub = (submessage: string) => {
	console.log(`Message has been subbed: ${submessage}`)
	pusher.trigger(chatroom, 'submessage', submessage);
};

export const publishServer = (response: string) => {
	// here as an option for server-side connection to IRC
	console.log(`Message has been servered`)
	pusher.trigger(chatroom, 'response', response);
};
