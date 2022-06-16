<script lang="ts">
import { fade } from 'svelte/transition'
import { message } from '$lib/stores'
</script>

{#if $message}
   <div transition:fade="{{delay:250, duration: 500}}">
        <p>Alert: {$message}</p>
   </div> 
{/if}
