require('dotenv').config();

const express = require('express');
const router = require("./app/routes/router");
const errorHandler = require('./app/middleware/errorHandler');
const { port } = require('./app/config/config');
const nunjucks = require('nunjucks');

const app = express();

app.use('/', router);
nunjucks.configure('app/views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'njk');

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
