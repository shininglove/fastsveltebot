import tmi from 'tmi.js';
import { publishMessage, publishSub } from '$lib/publish';
import {
	UserSupportEvents,
	type cheerEventState,
	type subEventState,
	type supportMap,
	type viewerSupportState
} from '$root/types/twitch';

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
		if (userstate['message-type'] !== UserSupportEvents.resub) {
			const subMap: supportMap = new Map();
			const subData: subEventState = { username, methods, message, userstate };
			subMap.set(UserSupportEvents.sub, subData);
			publishSub(subMap);
		}
	});

	client.on('cheer', (_, userstate, message) => {
		const cheerMap: supportMap = new Map();
		const cheerData: cheerEventState = {
			username: userstate.username || 'anon',
			message,
			userstate
		};
		cheerMap.set(UserSupportEvents.cheer, cheerData);
		publishSub(cheerMap);
	});

	client.on('raided', (_, username, viewers) => {
		const raidMap: supportMap = new Map();
		const raidData: viewerSupportState = { username, viewers };
		raidMap.set(UserSupportEvents.raid, raidData);
		publishSub(raidMap);
	});

	client.on('hosted', (_, username, viewers, autohost) => {
		const hostMap: supportMap = new Map();
		const hostData: viewerSupportState = { username, viewers, autohost };
		hostMap.set(UserSupportEvents.host, hostData);
		publishSub(hostMap);
	});

	client.on('subgift', (_, username, streakMonths, recipient, methods, userstate) => {
		const giftMap: supportMap = new Map();
		const giftData: subEventState = { username, streakMonths, recipient, methods, userstate };
		giftMap.set(UserSupportEvents.giftsub, giftData);
		publishSub(giftMap);
	});

	client.on('submysterygift', (_, username, numbOfSubs, methods, userstate) => {
		const mysteryGiftMap: supportMap = new Map();
		const mysteryGiftData: subEventState = { username, numbOfSubs, methods, userstate };
		mysteryGiftMap.set(UserSupportEvents.mysterysub, mysteryGiftData);
		publishSub(mysteryGiftMap);
	});

	client.on('resub', (_, username, months, message, userstate, methods) => {
		const reSubMap: supportMap = new Map();
		const reSubData: subEventState = { username, months, message, methods, userstate };
		reSubMap.set(UserSupportEvents.resub, reSubData);
		publishSub(reSubMap);
	});
};
