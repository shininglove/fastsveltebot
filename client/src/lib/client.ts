import tmi from 'tmi.js';
import { publishMessage } from './publish';

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

	client.connect();

	client.on('message', (_, tags, message, self) => {
		if (self) return;
		publishMessage({ tags, message });
	});

	client.on('subscription', (_, username, method, message, userstate) => {});
};
