import type { ChatUserstate, SubMethod } from 'tmi.js';
import {
	UserSupportEvents,
	type SoundRequest,
	type subSupportState,
	type supportMap,
	type userSupport
} from '$lib/twitch';
import { get } from 'svelte/store';
import {
	counterName,
	incrementCount,
	stopCount,
	updateCounterName,
	resetCount
} from '$lib/client/stores/counter';
import { populateMessages } from '$lib/client/stores/messages';
import { addSupportEvent } from './stores/alert';
import { addThemeEffect } from './stores/theme';
import { safeFetchData } from '$lib/helpers';

const testSupportHandler = (eventType: userSupport, args: subSupportState) => {
	const eventMap: supportMap = new Map();
	if (eventType in [UserSupportEvents.sub, UserSupportEvents.giftsub]) {
		eventMap.set(eventType, args);
	} else {
		eventMap.set(eventType, args);
	}
	addSupportEvent(eventMap);
};

export const messageHandler = (tags: ChatUserstate, message: string) => {
	const host = import.meta.env.VITE_API_HOST;
	const sender = tags.username;
	if (message.startsWith('!')) {
		const parsedMessage: string = message.replace('!', '').toLowerCase();
		const messageSections: string[] = parsedMessage.split(' ');
		const userNames = ['Bob', 'Richard', 'Matt', 'Tom'];
		const subTiers: SubMethod[] = ['1000', '2000', '3000', 'Prime'];
		const chosenName = userNames[Math.floor(Math.random() * userNames.length)];
		const command = messageSections.at(0);
		switch (command) {
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
			case 'reset':
				resetCount();
				break;
			case 'cmd':
			case 'command':
				break;
			case 'sub':
				testSupportHandler(UserSupportEvents.sub, {
					username: chosenName,
					message: 'Monkey see monkey do',
					methods: { plan: subTiers[Math.floor(Math.random() * subTiers.length)] },
					userstate: {}
				});
				break;
			case 'raid':
				testSupportHandler(UserSupportEvents.raid, {
					username: chosenName,
					viewers: Math.floor(Math.random() * 20)
				});
				break;
			default:
				const updateTheme = (data: SoundRequest) => {
					const userMap = new Map();
					userMap.set(sender, { sound_name: data.sound_name, sound_type: data.sound_type });
					addThemeEffect(userMap);
				};
				safeFetchData(
					`${host}/sound_effects`,
					{ sound_type: 'effects', sound_name: command! },
					updateTheme
				);
				safeFetchData(`${host}/user_commands`, { command: command }, () => {});
				break;
		}
	}
	safeFetchData(`${host}/add_message`, { user: tags, message }, (data: {first_message: boolean}) => {
		if (data.first_message) {
			const userMap = new Map();
			userMap.set(sender, { sound_name: sender, sound_type: "theme" });
			addThemeEffect(userMap);
		}
	});
};
