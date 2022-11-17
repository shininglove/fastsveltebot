<script lang="ts">
	import { counterName, countState } from '$lib/client/stores/counter';
	import { fade } from 'svelte/transition';
	import { pluarlize } from '$lib/helpers';
</script>

{#if $counterName}
	<div class="row-start-2 row-end-3 col-start-4" transition:fade={{ delay: 250, duration: 500 }}>
		<p class="text-6xl font-bold text-red-500">
			{pluarlize($counterName)} : {$countState}
		</p>
	</div>
{/if}
