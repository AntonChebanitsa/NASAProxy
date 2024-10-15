const { fetchAsteroidDataForWeekDates } = require('../repository/nasaApi');
const { formatAsteroidData, getWeekDates } = require('../utils/utils');

async function getAsteroidData(apiUrl, apiKey) {
    const {startDate, endDate} = getWeekDates();
    const data = await fetchAsteroidDataForWeekDates(apiUrl, apiKey, startDate, endDate);
    const asteroids = data.near_earth_objects;

    return Object.keys(asteroids)
        .map(date => formatAsteroidData(asteroids[date]))
        .flat();
}

module.exports = { getAsteroidData };
