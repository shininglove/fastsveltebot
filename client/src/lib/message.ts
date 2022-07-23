import type { ChatUserstate } from 'tmi.js';
import { UserSupportEvents } from '$root/types/twitch';
import { get } from 'svelte/store';
import { counterName, incrementCount, stopCount, updateCounterName } from '$lib/counter';
import { populateMessages } from '$lib/stores';
import { addSupportEvent, removeCurrentSupport } from './events';

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
			case get(counterName):
				incrementCount();
				break;
			case 'stopcount':
				stopCount();
				break;
			case 'sub':
				const subMap = new Map();
				const userNames = ['Bob', 'Richard', 'Matt', 'Tom'];
				const chosenName = userNames[Math.floor(Math.random() * userNames.length)];
				subMap.set(UserSupportEvents.sub, { username: chosenName, message: '' });
				addSupportEvent(subMap);
				break;
			case 'unsub':
				removeCurrentSupport();
				break;
			default:
				break;
		}
	}
};
