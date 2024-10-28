import express from 'express';
import router from './routes/router';
import errorHandler from './middleware/errorHandler';
import nunjucks from 'nunjucks';
import config from './config';
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from '@sentry/profiling-node';

const app = express();

Sentry.init({
  dsn: config.sentryDsn,
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

app.use(express.json());

app.use('/', router);

nunjucks.configure('app/views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');

Sentry.setupExpressErrorHandler(app)
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
