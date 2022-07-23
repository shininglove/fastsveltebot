import {handler} from './build/handler.js';
import express from 'express';
import http from 'http';

const app = express();

const httpServer = http.createServer(app);

const PORT = 3000;

httpServer.listen(PORT, function () {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (_, res) => {
    res.end('ok');
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);
