<script lang="ts">
	import { fade } from 'svelte/transition';
	import { message } from '$lib/stores';

	const playAudio = (node: HTMLElement) => {
		const sampleAudio = new Audio('https://samplelib.com/lib/preview/mp3/sample-3s.mp3');
		sampleAudio.addEventListener('ended', () => {
			console.log('Finished playing');
		});
		sampleAudio.play();
	};
</script>

{#if $message == 'theme'}
	<div
		class="fixed inset-y-40 inset-x-1/3 w-1/4 text-red-400"
		transition:fade={{ delay: 250, duration: 500 }}
		use:playAudio
	>
		<img
			class="w-fit h-fit"
			src="http://www.clker.com/cliparts/7/7/e/b/1513742325792949782commensalism-examples.hi.png"
			alt="moose-with-bird"
		/>
		<p class="text-4xl font-medium w-fix">imStarmi {$message}bed for 12 months</p>
	</div>
{/if}
