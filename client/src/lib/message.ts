import { get } from 'svelte/store';
import { populateMessages } from '$lib/stores';
import { counterName, incrementCount, updateCounterName, stopCount } from '$lib/counter';
import type { ChatUserstate } from 'tmi.js';

export const messageHandler = (tags: ChatUserstate, message: string) => {
	if (message.startsWith('!')) {
		const parsedMessage: string = message.replace('!', '').toLowerCase();
		const messageSections: string[] = parsedMessage.split(' ');
		const messageInfo = { tags, message: parsedMessage };
		populateMessages(messageInfo);
		console.log(messageSections.at(0));
		switch (messageSections.at(0)) {
			case 'count':
				const countMessage = messageSections.at(1) || '';
				updateCounterName(countMessage);
				break;
			case 'stopcount':
				stopCount();
				break;
			case get(counterName):
				incrementCount();
				break;
			default:
				break;
		}
	}
};
