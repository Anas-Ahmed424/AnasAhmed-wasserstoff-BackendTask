const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    setTimeout(() => {
        res.send('Response from REST API');
    }, 1000);
});

app.listen(port, () => {
    console.log(`Mock REST API running on port ${port}`);
});
