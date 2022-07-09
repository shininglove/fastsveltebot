<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { currentSupportName, currentSupportValue, removeCurrentSupport } from '$lib/events';

	let imgSrc: string;

	let currentUser: string;

	let host = getContext('host');

	const playAudio = (username: string) => {
		if (username !== currentUser && username) {
			const sampleAudio = new Audio(`${host}/audio/dog`);
			sampleAudio.volume = 0.5;
			sampleAudio.addEventListener('ended', () => {
				console.log('Finished playing');
				removeCurrentSupport();
				currentUser = '';
			});
			sampleAudio.play();
			currentUser = username;
		}
	};

	$: playAudio($currentSupportValue.username);

	onMount(async () => {
		const res = await fetch(`${host}/files`);
		const apiData = await res.json();
		imgSrc = apiData.img;
	});
</script>

<svelte:head>
	<link rel="preload" as="image" href={imgSrc} />
</svelte:head>

{#if $currentSupportValue}
	<div
		class="fixed inset-y-40 inset-x-1/3 w-1/4 text-red-500 text-center"
		transition:fade={{ delay: 300, duration: 500 }}
	>
		<img class="w-fit h-fit" src={imgSrc} alt="moose-with-bird" />
		<p class="text-4xl font-medium w-fix">
			{$currentSupportValue.username} has {$currentSupportName}bed for 6 months
		</p>
		<p class="text-2xl font-medium w-fix text-black">{$currentSupportValue.message}</p>
	</div>
{/if}
