import express from 'express';
import router from './routes/router';
import errorHandler from './middleware/errorHandler';
import nunjucks from 'nunjucks';
import config from './config';

const app = express();

app.use(express.json());

app.use('/', router);

nunjucks.configure('src/views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
