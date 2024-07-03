const express = require('express');
const app = express();
const port = 3003;

app.get('/', (req, res) => {
    setTimeout(() => {
        res.send('Response from gRPC API');
    }, 1500);
});

app.listen(port, () => {
    console.log(`Mock gRPC API running on port ${port}`);
});
