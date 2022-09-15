import 'dotenv/config';
import type { RequestHandler } from '@sveltejs/kit';
import { connect, serverMessagesToChat } from '$lib/server/client';
import { eventSubscribe } from '$lib/server/events';

let username: string = process.env.USER_NAME || '';
let password: string = process.env.TOKEN || '';
let channel: string = process.env.CHANNEL || '';

let client = connect(username, password, channel);

eventSubscribe();

serverMessagesToChat({
	client,
	channel,
	app_key: process.env.SOKETI_KEY || '',
	app_host: process.env.SOKETI_HOST || '',
	app_port: Number(process.env.SOKETI_PORT),
	app_ssl: process.env.SOKETI_SSL || ''
});

export const get: RequestHandler = async () => {
	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: {
			username: process.env.USER_NAME,
			endpoint: process.env.VITE_API_HOST,
			app_info: {
				app_key: process.env.SOKETI_KEY,
				app_host: process.env.SOKETI_HOST,
				app_port: process.env.SOKETI_PORT,
				app_ssl: process.env.SOKETI_SSL
			}
		}
	};
};
