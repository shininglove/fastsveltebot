<script lang="ts">
	import { getContext, onMount } from 'svelte';
	
	let soundList: string = "";
	let host: string = getContext('host');

	const fetchSoundData = async (host:string) => {
		
		const userSupportData = await fetch(`${host}/sounds`, {
			method: 'GET',
		});
		const result = await userSupportData.json();
		result.sounds.forEach((item: string) => {
			soundList += `!${item} `
		})
	};

	onMount(() => {
		fetchSoundData(host);	
	});
	
</script>

<div class="fixed inset-x-0 bottom-0 text-left text-lg pr-5 bg-pink-400 h-16">
	<div class="animate-marquee whitespace-nowrap">
		<span class="text-white text-5xl">{soundList}</span>
	</div>
	<!-- <div class="animate-marquee2 whitespace-nowrap top-0 absolute">
		<span class="text-white text-5xl">{soundList}</span>
	</div> -->
</div>
