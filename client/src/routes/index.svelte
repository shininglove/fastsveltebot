<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { chatSubscribe } from '$lib/subscribe';
	import Message from '$root/components/message.svelte';
	import Alert from '$root/components/alert.svelte';
	import Counter from '$root/components/ticker.svelte';
	import Events from '$root/components/events.svelte';
	export let username: string;
	export let endpoint: string;
	export let app_key: string;
	export let app_host: string;
	export let app_port: number;
	export let app_ssl: string;
	setContext('host', endpoint);
	onMount(() => {
		chatSubscribe(app_key, app_host, app_port, app_ssl);
	});
</script>

<div class="flex h-screen relative container">
	<Alert />
	<Counter />
	<Events />
	<Message botName={username} />
</div>
