<script lang="ts">
	import { fade } from 'svelte/transition';
	import { getContext } from 'svelte';
	import type { subSupportState, userSupport } from '$src/types/twitch';
	import { removeCurrentSupport } from '$lib/clientside/alert';
	import { playAudio } from '$src/lib/helpers';

	export let eventData: subSupportState;
	export let eventName: userSupport;
	export let color: string = 'red';
	export let delay: number = 300;
	export let duration: number = 500;

	let eventSubText: string;
	let eventMessage: string;
	let imgSrc: string;
	let host = getContext('host');

	let currentAlert: subSupportState[] = [];

	const alertAudio = (audioName: string, audioType: string = 'effects') => {
		playAudio(`${host}/audio/${audioType}/${audioName}`, () => {
			console.log('Finished playing');
			currentAlert = [];
			removeCurrentSupport();
		});
	};

	const fetchAlertData = async (params: subSupportState) => {
		if (!currentAlert.includes(params)) {
			const userSupportData = await fetch(`${host}/user_support/${eventName}`, {
				method: 'POST',
				body: JSON.stringify(params)
			});
			const result = await userSupportData.json();
			imgSrc = result.img;
			eventSubText = result.subtext;
			eventMessage = result.message;
			let eventAudioName = result.audio_path;
			alertAudio(eventAudioName);
			currentAlert.push(params);
		}
	};

	$: fetchAlertData(eventData);
</script>

<div
	class="fixed inset-y-40 inset-x-1/3 w-1/4 text-{color}-500 text-center row-span-1"
	transition:fade={{ delay, duration }}
>
	<img class="w-fit h-fit" src={imgSrc} alt="broken-img-link" />
	<p class="text-4xl font-medium w-fix">
		{eventMessage}
	</p>
	<p class="text-2xl font-medium w-fix text-black">{eventSubText}</p>
</div>
