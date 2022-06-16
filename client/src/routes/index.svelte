<script lang="ts">
    export let username: string;
    export let password: string;
    export let channel: string;

    import {connect} from '$lib/client'
    import {onMount} from 'svelte'
    import Message from '$root/components/message.svelte';
    import Alert from '$root/components/alert.svelte'

    onMount(() => {
        console.log();
        connect(username,password,channel);
    })

</script>
<h1>Welcome to My Playground</h1>
<p>Chatbot name: {username}</p>
<Message/>
<Alert/>

