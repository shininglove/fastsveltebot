import {
	UserSupportEvents,
	type subSupportState,
	type supportMap,
	type userSupport
} from '$lib/twitch';
import { publishSub } from './publish';

export const supportEventHandler = (eventType: userSupport, args: subSupportState) => {
	const eventMap: supportMap = new Map();
	switch (eventType) {
		case UserSupportEvents.sub:
			eventMap.set(UserSupportEvents.sub, args);
			break;
		case UserSupportEvents.raid:
			console.log("Trigger raid event!");
			eventMap.set(UserSupportEvents.raid, args);
			break;
		case UserSupportEvents.cheer:
			console.log("Trigger cheer event!");
			eventMap.set(UserSupportEvents.cheer, args);
			break;
		case UserSupportEvents.resub:
			eventMap.set(UserSupportEvents.resub, args);
			break;
		default:
			break;
	}
	const serializedEventMap = Object.fromEntries(eventMap.entries())
	publishSub(JSON.stringify(serializedEventMap));
};
