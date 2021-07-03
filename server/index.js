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

// this below function is just a temp solution
function findClosestColors(current) {
    const validColorRegex = /^[0-9A-F]{6}$/i;
    let validColors = [],
        limit = 200,
        dec = parseInt(current, 16),
        generated = 0;
    
    while (validColors.length < 10 && limit >= 0) {
        let randomModifier = Math.floor(Math.random() * (100 - 2 + 1) + 2);

        if (randomModifier % 2 === 0) {
            generated = (dec - randomModifier).toString(16);
        }
        else {
            generated = (dec + randomModifier).toString(16);
        }

        if (validColorRegex.test(generated) && validColors.indexOf(generated) === -1) {
            validColors.push(generated);
        }
        limit--;
    }

    return JSON.stringify(validColors);
}

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
        if (result && result[0]) {
            res.send({
                result
            });
        }
        else {
            redisPublisher.publish('insert', color);
            // the code below is not optimised. As worker is in different file for docker demo purpose, this approach has been taken
            res.send({
                result: findClosestColors(color)
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
    const values = await pgClient.query("SELECT * FROM colors ORDER BY id DESC LIMIT 10");

    res.send({
        result: values.rows
    });
});


app.listen(5000, () => {
    console.log('server listening at 5000');
});