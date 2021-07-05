const redis =  require('redis');
const keys = require('./keys');

const client = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort
});
const sub = client.duplicate();

sub.on('message', (channel, message) => {
    let messages = JSON.parse(message);
    client.hmset('colors', messages.color, messages.closeColors)
});

sub.subscribe('insert');