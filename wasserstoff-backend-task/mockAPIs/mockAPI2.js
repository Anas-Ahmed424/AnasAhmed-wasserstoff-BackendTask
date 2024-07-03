const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
    setTimeout(() => {
        res.send('Response from GraphQL API');
    }, 500);
});

app.listen(port, () => {
    console.log(`Mock GraphQL API running on port ${port}`);
});
