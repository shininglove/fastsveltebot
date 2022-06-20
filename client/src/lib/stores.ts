import { writable, derived } from 'svelte/store';
import type { userState } from '$root/types/twitch';

console.log('Store Initization');

export const defaultState: userState = { tags: {}, message: '' };

export const userMessages = writable(defaultState);

export const message = derived(userMessages, (msg) => msg.message);

export const displayName = derived(userMessages, (msg) => msg.tags['display-name'] || '');

let timeOutId: ReturnType<typeof setTimeout>;

const resetTime: number = 15000;

export const populateMessages = (data: userState) => {
	userMessages.set(data);
};

export const clearMessages = () => {
	if (timeOutId) {
		clearTimeout(timeOutId);
	}
	timeOutId = setTimeout(() => {
		userMessages.set(defaultState);
	}, resetTime);
};
