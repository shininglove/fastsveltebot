<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { chatSubscribe} from '$lib/client/subscribe';
	import Message from './message.svelte';
	import Alert from './alert.svelte';
	import Counter from './ticker.svelte';
	import Theme from './theme.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let { endpoint , app_info, username } = data;
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
