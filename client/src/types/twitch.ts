import type { CommonUserstate } from 'tmi.js';

export interface userState {
	tags: CommonUserstate;
	message: string;
}

export interface eventState {
	data: string;
	event: string;
}

export const enum UserSupportEvents {
	Sub,
	Cheer,
	Raid,
	Host
}