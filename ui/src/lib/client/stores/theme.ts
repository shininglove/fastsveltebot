import type { SoundRequest } from '$src/lib/twitch';
import { writable, derived } from 'svelte/store';

const defaultMap = new Map([['', {}]]);

const listOfEffects: Map<string, SoundRequest>[] = [];

export const effectsList = writable([defaultMap]);

export const playingEffect = derived(effectsList, (msg) => msg.filter((x) => x !== defaultMap)[0]);

export const playingEffectName = derived(playingEffect, (msg) =>
	msg ? msg.keys().next().value : ''
);

export const playingEffectValue = derived(playingEffect, (msg) =>
	msg ? msg.values().next().value : ''
);

export const addThemeEffect = (data: Map<string, SoundRequest>) => {
	effectsList.update((item) => [...item, data]);
	listOfEffects.push(data);
};

export const removeCurrentEffect = () => {
	effectsList.update((item) => item.filter((x) => x !== listOfEffects[0]));
	listOfEffects.shift();
};
