import pusherJs from 'pusher-js';
import { messageHandler } from '$lib/message';
import type { supportMap, userState, userSupport } from '$src/types/twitch';
import { addSupportEvent } from '$lib/alert';

export const chatSubscribe = (
	app_key: string,
	app_host: string,
	app_port: number,
	app_ssl: string
) => {
	let subClient = new pusherJs(app_key, {
		wsHost: app_host,
		wsPort: app_port,
		forceTLS: app_ssl === 'true',
		disableStats: true,
		enabledTransports: ['ws', 'wss']
	});
	console.log('Pusher client created...');
	try {
		let chatChannel = subClient.subscribe('chat-room');
		chatChannel.bind('message', (data: userState) => {
			messageHandler(data.tags, data.message);
		});
		chatChannel.bind('submessage', (subdata: supportMap) => {
			const keys = Object.keys(subdata)[0] as userSupport;
			const value = Object.values(subdata)[0];
			const parsedSubData: supportMap = new Map([[keys, value]])
			console.log(parsedSubData);
			addSupportEvent(parsedSubData);
		});
	} catch (error) {
		subClient.unsubscribe('chat-room');
	}
};
