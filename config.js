require('dotenv').config();

module.exports = {
    nasaApiUrl: process.env.NASA_API_URL,
    nasaApiKey: process.env.NASA_API_KEY,
    port: process.env.PORT,
};