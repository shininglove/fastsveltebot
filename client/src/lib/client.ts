import tmi from 'tmi.js';
import { publishMessage } from '$lib/publish';
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
			supportEventHandler('sub', {username, methods, message, userstate})
		}
	});

	client.on('cheer', (_, userstate, message) => {
		let username: string = userstate.username || 'anon';
		supportEventHandler('cheer',{username,userstate, message})
	});

	client.on('raided', (_, username, viewers) => {
		supportEventHandler('raid',{username, viewers})
	});

	client.on('hosted', (_, username, viewers, autohost) => {
		supportEventHandler('host',{username, viewers, autohost})
	});

	client.on('subgift', (_, username, streakMonths, recipient, methods, userstate) => {
		supportEventHandler('giftsub',{username, streakMonths, recipient, methods, userstate})
	});

	client.on('submysterygift', (_, username, numbOfSubs, methods, userstate) => {
		supportEventHandler('mysterysub',{username, numbOfSubs, methods, userstate})
	});

	client.on('resub', (_, username, months, message, userstate, methods) => {
		supportEventHandler('resub', {username, months, message, userstate, methods})
	});
};
