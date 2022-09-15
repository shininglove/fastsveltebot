<script lang="ts">
	import { getContext } from 'svelte';
	import { playAudio } from '$src/lib/helpers';
	import { removeCurrentEffect } from '$lib/clientside/theme';
	import type { SoundRequest } from '$src/types/twitch';

	export let currentEffectName: string;
	export let currentEffectValue: SoundRequest;

	let host = getContext('host');

	let user: string;
	let effect: string;
	let currentAudio: SoundRequest[] = [];

	const effectAudio = (audioName: string, audioType: string = 'effects') => {
		playAudio(`${host}/audio/${audioType}/${audioName}`, () => {
			console.log('Finished theme playing!');
			currentAudio = [];
			removeCurrentEffect();
		});
	};

	const fetchEffectData = async (params: SoundRequest) => {
		console.log('Fetching data...');
		// Remove extra fetch from here and dupes break it
		if (!currentAudio.includes(params)) {
			const soundEffectData = await fetch(`${host}/sound_effects`, {
				method: 'POST',
				body: JSON.stringify({ username: currentEffectName, ...params })
			});
			const result = await soundEffectData.json();
			if (result) {
				user = result.username;
				effect = result.sound_name;
				console.log(`Trying to play ${effect}`);
				effectAudio(effect);
				currentAudio.push(params);
			}
		}
	};

	$: fetchEffectData(currentEffectValue);
</script>

{#if user && effect}
	<div class="row-start-1">
		<div
			class="border-purple-400 w-1/2 border-8 p-8 text-center text-white bg-gray-800 rounded-xl text-xl"
		>
			<span class="text-purple-400 font-bold text-xl border-purple-400 p-1">&#9658;</span>
			<span class="text-blue-400">{user}</span>
			is playing <span class="font-bold">{effect}</span>
		</div>
	</div>
{/if}
