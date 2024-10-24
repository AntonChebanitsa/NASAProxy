import dotenv from 'dotenv';

dotenv.config();

interface Config {
  nasaApiUrl?: string;
  nasaApiKey?: string;
  port?: string | number;
}

const config: Config = {
  nasaApiUrl: process.env.NASA_API_URL,
  nasaApiKey: process.env.NASA_API_KEY,
  port: process.env.PORT || 3000,
};

export default config;