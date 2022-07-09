<script lang="ts">
	import { getContext, onMount } from 'svelte';

	let header: string;
	let song: string;

	let host = getContext('host');

	onMount(async () => {
		const res = await fetch(`${host}/data`);
		const apiData = await res.json();
		header = apiData.name;
		song = apiData.song;
	});
</script>

<div class="flex w-full absolute items-center h-1/5 pr-5">
	<div
		class="border-purple-400 w-1/4 border-8 p-8 relative text-center justify-center text-white bg-gray-800 inset-x-full rounded-xl text-xl"
	>
		<span class="text-purple-400 font-bold text-xl border-purple-400 p-1">&#9658;</span>
		<span class="text-blue-400">{header}</span>
		is playing <span class="font-bold">{song}</span>
	</div>
</div>
