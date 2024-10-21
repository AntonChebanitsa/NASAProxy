const axios = require('axios');
const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false
});

async function fetchMostRecentRoverImage(apiUrl, apiKey) {
    const url = `${apiUrl}/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${apiKey}`;
    const response = await axios.get(url, {httpsAgent: agent});

    return response.data;
}

module.exports = {fetchMostRecentRoverImage};
