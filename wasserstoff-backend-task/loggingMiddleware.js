const fs = require('fs');
const QueueManager = require('./queueManager');
const queueManager = new QueueManager();

function logRequest(req, res, next) {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms\n`;
        const queueMetrics = queueManager.getQueueMetrics();
        const queueLogEntry = `FIFO: ${queueMetrics.fifoQueueLength}, PRIORITY: ${queueMetrics.priorityQueueLength}, ROUND_ROBIN: ${queueMetrics.roundRobinQueueLengths}\n`;
        fs.appendFileSync('request_logs.txt', logEntry + queueLogEntry);
    });
    next();
}

module.exports = logRequest;

