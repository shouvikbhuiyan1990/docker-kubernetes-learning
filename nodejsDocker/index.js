const express = require('express');
const redis = require('redis');

const client = redis.createClient({
    host: 'redis-server'
});

client.set("visits", 1);

const app = express();

app.get('/', (req, res) => {
    client.get('visits', (err, value) => {
        if (!err) {
            res.send(`This server has been invoked ${value} times`);
            client.set("visits", Number(value) + 1);
        }
        else {
            res.send(`Error occured`);
        }
    });
});

app.listen(8080, () => {
    // port setting is done as 4001 in docker-compose.yml file
    console.log('server starting at 8080');
})