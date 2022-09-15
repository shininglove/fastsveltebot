import pusherJs from 'pusher-js';
import { messageHandler } from '$lib/clientside/message';
import type { supportMap, userState, userSupport } from '$src/types/twitch';
import { addSupportEvent } from '$lib/clientside/alert';

export interface ChatSubOptions {
	app_key: string;
	app_host: string;
	app_port: number;
	app_ssl: string;
}

export const chatSubscribe = (
	app_info: ChatSubOptions
) => {
	const {app_host,app_port,app_ssl,app_key} = app_info;
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
			const [keys] = Object.keys(subdata);
			const [value] = Object.values(subdata);
			const parsedSubData: supportMap = new Map([[keys as userSupport, value]]);
			addSupportEvent(parsedSubData);
		});
	} catch (error) {
		subClient.unsubscribe('chat-room');
	}
};
