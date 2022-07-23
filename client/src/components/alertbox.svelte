<script lang="ts">
	import { fade } from 'svelte/transition';
	import { getContext } from 'svelte';
	import type { subSupportState } from '$root/types/twitch';
	export let eventData: subSupportState;
	export let color: string = 'red';
	export let delay: number = 300;
	export let duration: number = 500;
	let host = getContext('host');

	let eventSubText: string;
	let eventMessage: string;
	let imgSrc: string;

	$: fetch(`${host}/support`, {
		method: 'POST',
		body: JSON.stringify(eventData)
	})
		.then((response) => response.json())
		.then((result) => {
			imgSrc = result.img;
			eventSubText = result.subtext;
			eventMessage = result.message;
		});
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
