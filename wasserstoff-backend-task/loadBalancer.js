const express = require('express');
const axios = require('axios');
const logRequest = require('./loggingMiddleware');
const QueueManager = require('./queueManager');
const app = express();
const port = process.env.LOAD_BALANCER_PORT || 3000;

const queueManager = new QueueManager();

const apis = [
    { type: 'REST', url: 'http://localhost:3001' },
    { type: 'GraphQL', url: 'http://localhost:3002' },
    { type: 'gRPC', url: 'http://localhost:3003' }
];

function randomRouting() {
    const index = Math.floor(Math.random() * apis.length);
    return apis[index].url;
}

app.use(logRequest);
app.use(express.json());

app.use((req, res) => {
    queueManager.addRequestToQueue({ req, res }, 'ROUND_ROBIN');  // Use ROUND_ROBIN for example
});

setInterval(async () => {
    const queuedRequest = queueManager.getRequestFromQueue('ROUND_ROBIN');
    if (queuedRequest) {
        const { req, res } = queuedRequest;
        const targetUrl = randomRouting();
        try {
            const response = await axios({
                method: req.method,
                url: targetUrl + req.url,
                data: req.body,
                headers: req.headers
            });
            res.status(response.status).send(response.data);
        } catch (error) {
            res.status(500).send('Error routing request');
        }
    }
}, 100);
app.listen(port, () => {
    console.log(`Load balancer running on port ${port}`);
});
