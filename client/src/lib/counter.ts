import { writable } from 'svelte/store';

export const countState = writable(0);

export const counterName = writable('');

const msToSeconds = 1000;

const seconds = 1;

const timeLimit = 5 * seconds;

let lastUpdateTime = Date.now();

export const incrementCount = () => {
	const currentTime = Date.now();
	const timeDiff = (currentTime - lastUpdateTime) / msToSeconds;
	console.log(timeDiff);
	if (timeDiff > timeLimit) {
		countState.update((num) => num + 1);
		lastUpdateTime = Date.now();
	}
};

const resetCount = () => {
	countState.set(0);
};

export const updateCounterName = (name: string) => {
	resetCount();
	counterName.set(name);
};

export const stopCount = () => {
	counterName.set('');
	resetCount();
};
