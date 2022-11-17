import 'dotenv/config';
import type { PageServerLoad } from './$types';
import { connect, serverMessagesToChat } from '$lib/server/client';
import { eventSubscribe } from '$lib/server/events';

let username: string = process.env.USER_NAME || '';
let password: string = process.env.TOKEN || '';
let channel: string = process.env.CHANNEL || '';

let client = connect(username, password, channel);

eventSubscribe();

let app_key = process.env.SOKETI_KEY || '';
let app_host = process.env.SOKETI_HOST || '';
let app_port = Number(process.env.SOKETI_PORT);
let app_ssl = process.env.SOKETI_SSL || '';
let endpoint = process.env.VITE_API_HOST || '';

serverMessagesToChat({
	client,
	channel,
	app_key,
	app_host,
	app_port,
	app_ssl
});

export const load: PageServerLoad = async () => {
	return {
		username,
		endpoint,
		app_info: {
			app_key,
			app_host,
			app_port,
			app_ssl
		}
	};
};
