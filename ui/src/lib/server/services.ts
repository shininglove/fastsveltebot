import {
	UserSupportEvents,
	type subSupportState,
	type supportMap,
	type userSupport
} from '$src/types/twitch';
import { publishSub } from './publish';

export const supportEventHandler = (eventType: userSupport, args: subSupportState) => {
	const eventMap: supportMap = new Map();
	switch (eventType) {
		case UserSupportEvents.sub:
			eventMap.set(UserSupportEvents.sub, args);
			break;
		default:
			break;
	}
	const serializedEventMap = Object.fromEntries(eventMap.entries())
	publishSub(JSON.stringify(serializedEventMap));
};
