import { writable, derived } from 'svelte/store';
import type {userState} from '$root/types/twitch'

console.log("Store Initization")

export const defaultState: userState = {tags: {}, message: ""}

export const userMessages = writable(defaultState)

export const message = derived(userMessages, msg => msg.message)

export const displayName = derived(userMessages, msg => msg.tags["display-name"] || '')

let timeOutId: ReturnType<typeof setTimeout>;

const resetTime: number = 5000;

export const populateMessages = (message: userState) => {
    userMessages.set(message);
    if (timeOutId) {
        clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
        userMessages.set(defaultState);
    },resetTime);
}

