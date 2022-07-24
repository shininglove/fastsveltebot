import { writable, derived } from 'svelte/store';

const defaultMap = new Map([['', {}]]);

const listOfEffects: Map<string,string>[] = [];

export const effectsList = writable([defaultMap]);

export const playingEffect = derived(
	effectsList,
	(msg) => msg.filter((x) => x !== defaultMap)[0]
);

export const playingEffectName = derived(playingEffect, (msg) =>
	msg ? msg.keys().next().value : ''
);

export const playingEffectValue = derived(playingEffect, (msg) =>
	msg ? msg.values().next().value : ''
);

export const addSupportEvent = (data: Map<string,string>) => {
	effectsList.update((item) => [...item, data]);
	listOfEffects.push(data);
};

export const removeCurrentSupport = () => {
	effectsList.update((item) => item.filter((x) => x !== listOfEffects[0]));
	listOfEffects.shift();
};
