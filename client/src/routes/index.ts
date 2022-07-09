import 'dotenv/config';
import type { RequestHandler } from '@sveltejs/kit';
import { connect } from '$lib/client';

let username: string = process.env.USER_NAME || '';
let password: string = process.env.TOKEN || '';
let channel: string = process.env.CHANNEL || '';

connect(username, password, channel);

export const get: RequestHandler = async () => {
	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: {
			username: process.env.USER_NAME,
			endpoint: process.env.API_HOST,
			app_key: process.env.SOKETI_KEY,
			app_host: process.env.SOKETI_HOST,
			app_port: process.env.SOKETI_PORT,
			app_ssl: process.env.SOKETI_SSL
		}
	};
};
