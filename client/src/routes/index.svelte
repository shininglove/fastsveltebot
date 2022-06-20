<script lang="ts">
	import { onMount } from 'svelte';
	import { connect } from '$lib/client';
	import Message from '$root/components/message.svelte';
	import Alert from '$root/components/alert.svelte';
	import Counter from '$root/components/ticker.svelte';
	export let username: string;
	export let password: string;
	export let channel: string;
	onMount(() => {
		connect(username, password, channel);
	});
</script>

<div class="flex h-screen justify-end items-center">
	<Message botName={username} />
	<Alert />
	<Counter />
</div>
