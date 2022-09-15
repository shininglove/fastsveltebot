import { ClientCredentialsAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { EventSubListener } from '@twurple/eventsub';
import { NgrokAdapter } from '@twurple/eventsub-ngrok';
import type { UserNameResolvable } from '@twurple/common/lib/userResolvers';
import 'dotenv/config';
import { supportEventHandler } from '$lib/server/services';

const clientId = process.env.CLIENT_ID || '';
const accessToken = process.env.TWITCH_CLIENT_SECRET || '';

export const eventSubscribe = async () => {
	console.log('Connecting to eventsub...');

	const authProvider = new ClientCredentialsAuthProvider(clientId, accessToken);

	const apiClient = new ApiClient({ authProvider });

	await apiClient.eventSub.deleteAllSubscriptions();

	const listener = new EventSubListener({
		apiClient,
		adapter: new NgrokAdapter(),
		secret: 'c56bb3b37dcb67d7e0a5c076f889a862',
		strictHostCheck: true
	});

	await listener.listen();

	const channel = process.env.CHANNEL as UserNameResolvable;

	const user = await apiClient.users.getUserByName(channel);

	const onlineSubscription = await listener.subscribeToStreamOnlineEvents(user!.id, (e) => {
		console.log(`${e.broadcasterDisplayName} just went live!`);
	});

	const offlineSubscription = await listener.subscribeToStreamOfflineEvents(user!.id, (e) => {
		console.log(`${e.broadcasterDisplayName} just went live!`);
	});

	const channelFollow = await listener.subscribeToChannelFollowEvents(user!.id, (e) => {
		console.log(`${e.userDisplayName} has followed the channel!`);
	});

	const redeemedChannel = await listener.subscribeToChannelRedemptionAddEvents(user!.id, (e) => {
		// TODO: add knock prank redeem and scam redeem
		supportEventHandler('sub', {
			username: `${e.userDisplayName}`,
			message: `${e.rewardTitle} (${e.rewardId})`,
			methods: { plan: '3000' },
			userstate: {}
		});
		console.log(
			`${e.userDisplayName} redeemed ${e.rewardTitle} for ${e.rewardCost} @ ${e.rewardId}`
		);
	});

	process.on('SIGTERM', async () => {
		await onlineSubscription.stop();
		await offlineSubscription.stop();
		await channelFollow.stop();
		await redeemedChannel.stop();
	});
};
