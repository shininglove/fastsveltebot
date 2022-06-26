<script lang="ts">
	import { onMount } from 'svelte';
	import { connect } from '$lib/client';
	import Message from '$root/components/message.svelte';
	import Alert from '$root/components/alert.svelte';
	import Counter from '$root/components/ticker.svelte';
	import Events from '$root/components/events.svelte';
	export let username: string;
	export let password: string;
	export let channel: string;
	onMount(() => {
		connect(username, password, channel);
	});
</script>

<div class="flex h-screen relative container">
	<Message botName={username} />
	<Alert />
	<Counter />
	<Events />
</div>
