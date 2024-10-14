const axios = require('axios');
const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false
});

async function fetchAsteroidData(url) {
    const response = await axios.get(url, { httpsAgent: agent });
    return response.data;
}

module.exports = {fetchAsteroidData};
