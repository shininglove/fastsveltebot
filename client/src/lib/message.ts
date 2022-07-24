import type { ChatUserstate } from 'tmi.js';
import { UserSupportEvents, type subSupportState, type supportMap, type userSupport } from '$src/types/twitch';
import { get } from 'svelte/store';
import { counterName, incrementCount, stopCount, updateCounterName } from '$lib/counter';
import { populateMessages } from '$lib/stores';
import { addSupportEvent, removeCurrentSupport } from './events';

const testSupportHandler = (eventType: userSupport, args: subSupportState) => {
	const eventMap: supportMap = new Map();
	if (eventType in [UserSupportEvents.sub, UserSupportEvents.giftsub] ){
		eventMap.set(eventType,args);
	} else {
		eventMap.set(eventType,args);
	}
	addSupportEvent(eventMap);
}

export const messageHandler = (tags: ChatUserstate, message: string) => {
	if (message.startsWith('!')) {
		const parsedMessage: string = message.replace('!', '').toLowerCase();
		const messageSections: string[] = parsedMessage.split(' ');
		const messageInfo = { tags, message: parsedMessage };
		populateMessages(messageInfo);
		const userNames = ['Bob', 'Richard', 'Matt', 'Tom'];
		const chosenName = userNames[Math.floor(Math.random() * userNames.length)];
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
				testSupportHandler(UserSupportEvents.sub, { 
					username: chosenName, 
					message: 'Monkey see monkey do', 
					methods: {'plan': '1000'}, 
					userstate: {} 
				});
				break;
			case 'raid':
				testSupportHandler(UserSupportEvents.raid, { 
					username: chosenName, 
					viewers: 20
				});
				break;
			case 'unsub':
				removeCurrentSupport();
				break;
			default:
				break;
		}
	}
};
