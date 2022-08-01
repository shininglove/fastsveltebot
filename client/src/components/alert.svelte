<script lang="ts">
	import { currentSupportName, currentSupportValue } from '$lib/events';
	import AlertBox from '$src/components/alertbox.svelte';
</script>

{#if $currentSupportName}
	<AlertBox eventData={$currentSupportValue} eventName={$currentSupportName} />
{/if}
