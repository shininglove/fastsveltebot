import { writable, derived } from 'svelte/store';
import type { supportMap } from '$src/types/twitch';

const defaultMap = new Map([['', {}]]);

const listOfSupport: supportMap[] = [];
export const supportInfo = writable([defaultMap]);
export const currentSupportState = derived(
	supportInfo,
	(msg) => msg.filter((x) => x !== defaultMap)[0]
);
export const currentSupportName = derived(currentSupportState, (msg) =>
	msg ? msg.keys().next().value : ''
);
export const currentSupportValue = derived(currentSupportState, (msg) =>
	msg ? msg.values().next().value : ''
);
export const addSupportEvent = (data: supportMap) => {
	supportInfo.update((item) => [...item, data]);
	listOfSupport.push(data);
};
export const removeCurrentSupport = () => {
	supportInfo.update((item) => item.filter((x) => x !== listOfSupport[0]));
	listOfSupport.shift();
};