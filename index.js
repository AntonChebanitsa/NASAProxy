require('dotenv').config();

const express = require('express');
const routes = require('./app/delivery/routes');
const errorHandler = require('./app/middleware/errorHandler');
const app = express();
const port = port || 3000;

app.use('/', routes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
