import type { CommonUserstate, SubMethods, SubUserstate } from 'tmi.js';

export interface userState {
	tags: CommonUserstate;
	message: string;
}

export interface eventState {
	username: string;
	message: string;
}

export interface subEventState {
	username: string;
	method: SubMethods;
	message: string;
	userstate: SubUserstate;
}

export const enum UserSupportEvents {
	Sub = 'sub',
	Cheer = 'cheer',
	Raid = 'raid',
	Host = 'host'
}

export type userSupport = keyof typeof UserSupportEvents;

export type supportMap = Map<userSupport, eventState>;
