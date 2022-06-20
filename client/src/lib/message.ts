import { get } from 'svelte/store';
import { populateMessages } from '$lib/stores';
import { counterName, incrementCount, updateCounterName, stopCount } from '$lib/counter';
import type { ChatUserstate } from 'tmi.js';

export const messageHandler = (tags: ChatUserstate, message: string) => {
	const parsedMessage: string = message.replace('!', '');
	if (message.startsWith('!')) {
		const messageInfo = { tags, message: parsedMessage };
		populateMessages(messageInfo);
	}
	if (message.startsWith('!count')) {
		const countMessage = message.split(' ').at(1) || '';
		updateCounterName(countMessage);
	}
	if (parsedMessage == get(counterName)) {
		incrementCount();
	}
	if (message.startsWith('!stopcount')) {
		stopCount();
	}
};
