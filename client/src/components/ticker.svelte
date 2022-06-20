<script lang="ts">
	import { counterName, countState } from '$lib/counter';
	import { fade } from 'svelte/transition';
</script>

{#if $counterName}
	<div class="text-center" transition:fade={{ delay: 250, duration: 500 }}>
		<p class="text-7xl font-medium pr-10 text-red-600">{$counterName} : {$countState}</p>
	</div>
{/if}
