<script lang="ts">
	import { counterName, countState } from '$lib/counter';
	import { fade } from 'svelte/transition';
	import { pluarlize } from '$lib/helpers';
</script>

{#if $counterName}
	<div class="absolute inset-y-1/2 w-full" transition:fade={{ delay: 250, duration: 500 }}>
		<p class="text-6xl font-bold text-red-500 relative inset-x-full">{pluarlize($counterName)} : {$countState}</p>
	</div>
{/if}
