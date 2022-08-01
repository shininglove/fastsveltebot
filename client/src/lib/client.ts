import tmi from 'tmi.js';
import pusherJs from 'pusher-js';
import { publishMessage, publishServer } from '$lib/publish';
import { supportEventHandler } from './services';

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

	client.on('subscription', (_, username, methods, message, userstate) => {
		if (userstate['message-type'] !== 'resub') {
			supportEventHandler('sub', { username, methods, message, userstate });
		}
	});

	client.on('cheer', (_, userstate, message) => {
		let username: string = userstate.username || 'anon';
		supportEventHandler('cheer', { username, userstate, message });
	});

	client.on('raided', (_, username, viewers) => {
		supportEventHandler('raid', { username, viewers });
	});

	client.on('hosted', (_, username, viewers, autohost) => {
		supportEventHandler('host', { username, viewers, autohost });
	});

	client.on('subgift', (_, username, streakMonths, recipient, methods, userstate) => {
		supportEventHandler('giftsub', { username, streakMonths, recipient, methods, userstate });
	});

	client.on('submysterygift', (_, username, numbOfSubs, methods, userstate) => {
		supportEventHandler('mysterysub', { username, numbOfSubs, methods, userstate });
	});

	client.on('resub', (_, username, months, message, userstate, methods) => {
		supportEventHandler('resub', { username, months, message, userstate, methods });
	});

	return client;
};

interface serverOptions {
	client: tmi.Client;
	channel: string;
	app_host: string;
	app_port: number;
	app_ssl: string;
	app_key: string;
}

export const serverMessagesToChat = (options: serverOptions) => {
	let { app_host, app_port, app_ssl, app_key, client, channel } = options;
	let subClient = new pusherJs(app_key, {
		wsHost: app_host,
		wsPort: app_port,
		forceTLS: app_ssl === 'true',
		disableStats: true,
		enabledTransports: ['ws', 'wss']
	});
	try {
		let chatChannel = subClient.subscribe('chat-room');
		chatChannel.bind('response', (message: string) => {
			client.say(channel, message);
		});
	} catch (error) {
		subClient.unsubscribe('chat-room');
	}
};
