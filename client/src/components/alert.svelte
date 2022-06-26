<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { message } from '$lib/stores';

	let imgSrc: string;

	const playAudio = (_: HTMLElement) => {
		const sampleAudio = new Audio('/api/audio/dog');
		sampleAudio.volume = 0.5;
		sampleAudio.addEventListener('ended', () => {
			console.log('Finished playing');
		});
		sampleAudio.play();
	};

	onMount(async () => {
		const res = await fetch('/api/files');
		const apiData = await res.json();
		imgSrc = apiData.img;
	});

</script>

{#if $message == 'sub'}
	<div
		class="fixed inset-y-40 inset-x-1/3 w-1/4 text-red-400"
		transition:fade={{ delay: 300, duration: 500 }}
		use:playAudio
	>
		<img class="w-fit h-fit" src={imgSrc} alt="moose-with-bird" />
		<p class="text-4xl font-medium w-fix">Sara {$message}bed for 6 months</p>
	</div>
{/if}
