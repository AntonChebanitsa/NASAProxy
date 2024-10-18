require('dotenv').config();

const express = require('express');
const routes = require('./app/controllers/meteor.controller');
const errorHandler = require('./app/middleware/errorHandler');
const { port } = require('./app/config/config');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('app/views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'njk');

app.use('/', routes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
