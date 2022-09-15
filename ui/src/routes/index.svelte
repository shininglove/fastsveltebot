<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { chatSubscribe, type ChatSubOptions} from '$lib/client/subscribe';
	import Message from '$src/components/message.svelte';
	import Alert from '$src/components/alert.svelte';
	import Counter from '$src/components/ticker.svelte';
	import Theme from '$src/components/theme.svelte';
	export let username: string;
	export let endpoint: string;
	export let app_info: ChatSubOptions;
	setContext('host', endpoint);
	onMount(() => {
		chatSubscribe(app_info);
	});
</script>

<div class="h-screen w-screen relative container grid grid-cols-3 grid-rows-3 grid-flow-col gap-3">
	<Alert />
	<Counter />
	<Theme />
	<Message botName={username} />
</div>
