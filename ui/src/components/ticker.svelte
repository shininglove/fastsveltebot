<script lang="ts">
	import { counterName, countState } from '$lib/clientside/stores/counter';
	import { fade } from 'svelte/transition';
	import { pluarlize } from '$lib/helpers';
</script>

{#if $counterName}
	<div class="row-start-1 row-end-3 col-start-3 border-green-400 border-4" transition:fade={{ delay: 250, duration: 500 }}>
		<p class="text-6xl font-bold text-red-500">
			{pluarlize($counterName)} : {$countState}
		</p>
	</div>
{/if}
