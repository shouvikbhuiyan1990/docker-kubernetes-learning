const express = require('express');

const app = new express();

app.get('/', (req, res) => {
    res.send('this is a very basic node api using docker !');
});

app.listen(8080, () => {
    console.log('server is running at 8080 port');
});