<script lang="ts">
	import { currentSupportName, currentSupportValue } from '$lib/client/stores/alert';
	import AlertBox from './alertbox.svelte';
</script>

{#if $currentSupportName}
	<AlertBox eventData={$currentSupportValue} eventName={$currentSupportName} />
{/if}
