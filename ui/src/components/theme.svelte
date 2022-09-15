<script lang="ts">
	import { playingEffectName, playingEffectValue, playingEffect } from '$lib/client/stores/theme';
	import ThemePlayer from '$src/components/themeplayer.svelte';
</script>

{#if $playingEffect}
	<ThemePlayer currentEffectName={$playingEffectName} currentEffectValue={$playingEffectValue} />
{/if}
