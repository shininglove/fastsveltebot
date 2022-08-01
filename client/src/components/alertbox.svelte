<script lang="ts">
	import { fade } from 'svelte/transition';
	import { getContext } from 'svelte';
	import type { subSupportState, userSupport } from '$src/types/twitch';
	import { removeCurrentSupport } from '$lib/events';
	import { playAudio } from '$src/lib/helpers';

	export let eventData: subSupportState;
	export let eventName: userSupport;
	export let color: string = 'red';
	export let delay: number = 300;
	export let duration: number = 500;

	let eventSubText: string;
	let eventMessage: string;
	let imgSrc: string;
	let currentUser: string;
	let host = getContext('host');

	$: fetch(`${host}/user_support/${eventName}`, {
		method: 'POST',
		body: JSON.stringify(eventData)
	})
		.then((response) => response.json())
		.then((result) => {
			imgSrc = result.img;
			eventSubText = result.subtext;
			eventMessage = result.message;
			let eventAudioName = result.audio_path
			alertAudio(eventAudioName);
		});

	const alertAudio = (audioName: string) => {
		const username = eventData.username;
		if (username !== currentUser && username) {
			playAudio(`${host}/audio/${audioName}`, () => {
				console.log('Finished playing');
				removeCurrentSupport();
				currentUser = '';
			});
			currentUser = username;
		}
	};
</script>

<div
	class="fixed inset-y-40 inset-x-1/3 w-1/4 text-{color}-500 text-center"
	transition:fade={{ delay, duration }}
>
	<img class="w-fit h-fit" src={imgSrc} alt="moose-with-bird" />
	<p class="text-4xl font-medium w-fix">
		{eventMessage}
	</p>
	<p class="text-2xl font-medium w-fix text-black">{eventSubText}</p>
</div>
