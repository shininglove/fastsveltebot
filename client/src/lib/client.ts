import tmi from 'tmi.js';
import { messageHandler } from '$lib/message';
import { UserSupportEvents } from '$root/types/twitch';

console.log('Creating client...');

export const connect = (username: string, token: string, channel: string) => {
	const client = new tmi.Client({
		options: { debug: true, messagesLogLevel: 'info', skipUpdatingEmotesets: true },
		identity: {
			username: username,
			password: token
		},
		channels: [channel || '', username || '']
	});

	client.on('message', (_, tags, message, self) => {
		if (self) return;
		messageHandler(tags, message.toLowerCase());
	});

	client.on('subscription', (_, username, method, message, userstate) => {

	});

	client.connect();
};
