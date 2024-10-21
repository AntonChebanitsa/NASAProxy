const {fetchAsteroidData} = require('../repositories/meteor.repository');
const {formatAsteroidData} = require('../utils/utils');

async function getAsteroidData(apiUrl, apiKey, startDate, endDate, includeSentryObjectsCount, checkDangerousMeteors) {
    const data = await fetchAsteroidData(apiUrl, apiKey, startDate, endDate);
    const asteroids = data.near_earth_objects;

    const formattedData = Object.values(asteroids).flatMap(formatAsteroidData);
    const response = { data: formattedData };

    if (checkDangerousMeteors) {
        response.wereDangerousMeteors = Object.values(asteroids)
            .flat()
            .some(asteroid => asteroid.is_potentially_hazardous_asteroid);
    }

    if (includeSentryObjectsCount) {
        response.sentryObjectsCount = Object.values(asteroids)
            .flat()
            .filter(asteroid => asteroid.is_sentry_object).length;
    }

    return response;
}

module.exports = {getAsteroidData};
