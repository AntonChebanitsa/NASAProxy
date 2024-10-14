const { fetchAsteroidData } = require('../repository/nasaApi');
const { formatAsteroidData, getWeekDates } = require('../utils/utils');

async function getAsteroidData(apiUrl, apiKey) {
    const { startDate, endDate } = getWeekDates();
    const url = `${apiUrl}?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
    const data = await fetchAsteroidData(url);
    const asteroids = data.near_earth_objects;
    const formattedData = [];

    Object.keys(asteroids).forEach(date => {
        formattedData.push(...formatAsteroidData(asteroids[date]));
    });

    return formattedData;
}

module.exports = { getAsteroidData };
