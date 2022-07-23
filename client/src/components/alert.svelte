<script lang="ts">
	import { getContext } from 'svelte';
	import { currentSupportName, currentSupportValue, removeCurrentSupport } from '$lib/events';
	import AlertBox from '$root/components/alertbox.svelte';
	let currentUser: string;
	let host = getContext('host');

	const playAudio = (username: string) => {
		if (username !== currentUser && username) {
			const sampleAudio = new Audio(`${host}/audio/${username}`);
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
</script>

{#if $currentSupportName}
	<AlertBox eventData={$currentSupportValue} />
{/if}
