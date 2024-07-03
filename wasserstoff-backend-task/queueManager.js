class QueueManager {
    constructor() {
        this.fifoQueue = [];
        this.priorityQueue = [];
        this.roundRobinQueues = [[], [], []];
        this.rrIndex = 0;
    }

    addRequestToQueue(request, strategy) {
        switch (strategy) {
            case 'FIFO':
                this.fifoQueue.push(request);
                break;
            case 'PRIORITY':
                this.priorityQueue.push(request);
                this.priorityQueue.sort((a, b) => b.priority - a.priority);
                break;
            case 'ROUND_ROBIN':
                this.roundRobinQueues[this.rrIndex].push(request);
                this.rrIndex = (this.rrIndex + 1) % this.roundRobinQueues.length;
                break;
            default:
                this.fifoQueue.push(request);
        }
    }

    getRequestFromQueue(strategy) {
        switch (strategy) {
            case 'FIFO':
                return this.fifoQueue.shift();
            case 'PRIORITY':
                return this.priorityQueue.shift();
            case 'ROUND_ROBIN':
                const queue = this.roundRobinQueues[this.rrIndex];
                const request = queue.shift();
                this.rrIndex = (this.rrIndex + 1) % this.roundRobinQueues.length;
                return request;
            default:
                return this.fifoQueue.shift();
        }
    }

    getQueueMetrics() {
        return {
            fifoQueueLength: this.fifoQueue.length,
            priorityQueueLength: this.priorityQueue.length,
            roundRobinQueueLengths: this.roundRobinQueues.map(queue => queue.length)
        };
    }
}

module.exports = QueueManager;
