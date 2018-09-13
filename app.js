const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({'teste': 'Hello World!'});
});

app.listen(process.env.PORT || 3000);