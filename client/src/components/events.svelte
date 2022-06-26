<script lang="ts">
	import { onMount } from 'svelte';

	let header: string;

	onMount(async () => {
		const res = await fetch('/api/data');
		const apiData = await res.json();
		header = apiData.name;
	});
</script>

<div>{header}</div>
