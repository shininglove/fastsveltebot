<script lang="ts">
	import { onMount } from 'svelte';

	let header: string;

	onMount(async () => {
		const res = await fetch('/api/data');
		const apiData = await res.json();
		header = apiData.name;
	});
</script>

<div class="flex w-full absolute items-center h-1/5 pr-5">
	<div class="border-purple-400 w-1/4 border-8 p-8 relative text-center justify-center text-white bg-gray-800 inset-x-full rounded-xl text-xl">
		<span class="text-purple-400 font-bold text-xl border-purple-400 p-1">&#9658;</span> {header} is playing Radiant
	</div>
</div>