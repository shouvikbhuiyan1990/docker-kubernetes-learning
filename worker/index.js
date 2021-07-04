const redis =  require('redis');
const keys = require('./keys');

const client = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort
});
const sub = client.duplicate();

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

sub.on('message', (channel, message) => {
    client.hmset('colors', message, findClosestColors(message))
});

sub.subscribe('insert');