import tmi from 'tmi.js';
import {populateMessages} from '$lib/stores'

console.log("creating client");

export const connect = (username: string, token: string, channel: string) => {

    const client = new tmi.Client({
        options: { debug: true, messagesLogLevel: "info" ,skipUpdatingEmotesets: true},
        identity: {
            username: username,
            password: token
        },
        channels: [ channel || '' ]
    });

    client.on('message', (_, tags, message, self) => {
        if(self) return;
        if(message.startsWith("!")) {
           const messageInfo = {tags,message}
           populateMessages(messageInfo);
        }
    });

    client.connect()
}

