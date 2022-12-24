import pusherJs from 'pusher-js';
import { messageHandler } from '$lib/client/handler';
import type { supportMap, userState, userSupport } from '$src/lib/twitch';
import { addSupportEvent } from '$lib/client/stores/alert';

export interface ChatSubOptions {
	app_key: string;
	app_host: string;
	app_port: number;
	app_ssl: string;
}

export const chatSubscribe = (app_info: ChatSubOptions) => {
	const { app_host, app_port, app_ssl, app_key } = app_info;
	let subClient = new pusherJs(app_key, {
		// wsHost: app_host,
		// wsPort: app_port,
		// wssPort: app_port,
		// forceTLS: false,
		// disableStats: true,
		// enabledTransports: ['ws','wss'],
		cluster: 'us2'
	});
	console.log('Pusher client created...');
	console.log(subClient)
	try {
		let chatChannel = subClient.subscribe('chat-room');
		chatChannel.bind('message', (data: userState) => {
			console.log(`Received and retrieved: message`)
			messageHandler(data.tags, data.message);
		});
		chatChannel.bind('submessage', (subdata: supportMap) => {
			const [keys] = Object.keys(subdata);
			const [value] = Object.values(subdata);
			console.log(`Received and retrieved: ${keys}`)
			console.log(`Information from sub event: ${value}`)
			const parsedSubData: supportMap = new Map([[keys as userSupport, value]]);
			addSupportEvent(parsedSubData);
		});
	} catch (error) {
		console.log(`${error}`)
		subClient.unsubscribe('chat-room');
	}
};
