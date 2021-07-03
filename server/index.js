const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
const { Pool } = require('pg');

const client = redis.createClient();
const redisPublisher = client.duplicate();

const pgClient = new Pool({
    user: 'shouvikbhuiyan',
    host: 'localhost',
    database: 'testdb',
    password: 'password',
    port: 5432,
});
  
pgClient.on("connect", (client) => {
client
    .query("CREATE TABLE IF NOT EXISTS colors (color VARCHAR, id VARCHAR)")
    .catch((err) => console.error(err));
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    // client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');

    // client.hgetall('frameworks', function(err, object) {
    //     console.log(object);
    //     res.send(object);
    // });

    res.send('Hi! these are very simple apis to create multi container docker');
});

app.post('/api/closest/colors', async (req, res) => {
    const color = req.body.color;
    await pgClient.query("INSERT INTO colors(color, id) VALUES($1, $2)", [color, new Date().toString()]);
    client.hmget('colors', color, function(err, result) {
        console.log('Results are ',result);
        if (result && result[0]) {
            res.send({
                result
            });
        }
        else {
            redisPublisher.publish('insert', color);
            res.send({
                result: []
            });
        }
    });
});

app.get('/api/get/allcolors', (req, res) => {
    client.hgetall('colors', function(err, object) {
        res.send(object);
    });
});

app.get('/api/recentSearches', async (req, res) => {
    const values = await pgClient.query("SELECT * FROM colors ORDER BY id DESC LIMIT 2");

    res.send({
        result: values.rows
    });
});


app.listen(5000, () => {
    console.log('server listening at 5000');
});