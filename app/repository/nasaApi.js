const axios = require('axios');
const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false
});

async function fetchAsteroidData(url) {
    try {
        const response = await axios.get(url, {httpsAgent: agent});
        return response.data;
    } catch (error) {
        console.error('Error fetching data from NASA API:', error);
        throw error;
    }
}

module.exports = {fetchAsteroidData};
