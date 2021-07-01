const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hi, Express server is running');
});


app.listen(5000, () => {
    console.log('server listening at 5000');
});