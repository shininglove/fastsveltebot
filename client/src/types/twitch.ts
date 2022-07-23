import type {
	ChatUserstate,
	CommonUserstate,
	SubGiftUserstate,
	SubMethods,
	SubMysteryGiftUserstate,
	SubUserstate
} from 'tmi.js';

export interface userState {
	tags: CommonUserstate;
	message: string;
}

export interface subEventState {
	channel?: string;
	username: string;
	methods: SubMethods;
	message?: string;
	userstate: SubUserstate | SubGiftUserstate | SubMysteryGiftUserstate;
	recipient?: string;
	numbOfSubs?: number;
	months?: number;
	streakMonths?: number;
}

export interface cheerEventState {
	username: string;
	userstate: ChatUserstate;
	message: string;
}

export interface viewerSupportState {
	username: string;
	viewers: number;
	autohost?: boolean;
}

export const enum UserSupportEvents {
	sub = 'sub',
	giftsub = 'giftsub',
	resub = 'resub',
	mysterysub = 'mysterysub',
	cheer = 'cheer',
	raid = 'raid',
	host = 'host'
}

export type userSupport = keyof typeof UserSupportEvents;

export type subSupportState = subEventState | viewerSupportState | cheerEventState;

export type supportMap = Map<userSupport, subSupportState>;
