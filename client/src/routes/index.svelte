<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { chatSubscribe } from '$lib/subscribe';
	import Message from '$src/components/message.svelte';
	import Alert from '$src/components/alert.svelte';
	import Counter from '$src/components/ticker.svelte';
	import Theme from '$src/components/theme.svelte';
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
	<Theme />
	<Message botName={username} />
</div>
