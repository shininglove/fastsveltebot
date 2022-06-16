import 'dotenv/config'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async () => {
    return {
        headers: { 'Content-Type' : 'application/json' },
        status: 200,
        body: { 
            username: process.env.USER_NAME,
            password: process.env.TOKEN,
            channel: process.env.CHANNEL
        }
    }
}
