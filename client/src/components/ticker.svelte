<script lang="ts">
	import { counterName, countState } from '$lib/counter';
	import { fade } from 'svelte/transition';
	import { pluarlize } from '$lib/helpers';
</script>

{#if $counterName}
	<div class="fixed inset-x-3/4 inset-y-1/2 w-max" transition:fade={{ delay: 250, duration: 500 }}>
		<p class="text-6xl font-bold text-red-500">{pluarlize($counterName)} : {$countState}</p>
	</div>
{/if}
