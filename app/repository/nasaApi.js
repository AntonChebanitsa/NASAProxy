const axios = require('axios');
const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false
});

async function fetchAsteroidDataForWeekDates(apiUrl, apiKey, startDate, endDate) {
    const url = `${apiUrl}?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
    const response = await axios.get(url, {httpsAgent: agent});

    return response.data;
}

module.exports = {fetchAsteroidDataForWeekDates};
