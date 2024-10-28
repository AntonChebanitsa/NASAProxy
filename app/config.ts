import dotenv from 'dotenv';

dotenv.config();

interface Config {
  nasaApiUrl?: string;
  nasaApiKey?: string;
  port?: string | number;
  sentryDsn?: string;
}

const config: Config = {
  nasaApiUrl: process.env.NASA_API_URL,
  nasaApiKey: process.env.NASA_API_KEY,
  port: process.env.PORT || 3000,
  sentryDsn: process.env.SENTRY_DSN,
};

export default config;