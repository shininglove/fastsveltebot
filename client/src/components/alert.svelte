<script lang="ts">
	import { fade } from 'svelte/transition';
	import { message } from '$lib/stores';
</script>

{#if $message == 'sub'}
	<div class="text-center" transition:fade={{ delay: 250, duration: 500 }}>
		<p class="text-3xl font-medium pr-10">Counter: {$message}</p>
	</div>
{/if}
