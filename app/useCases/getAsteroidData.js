const {fetchAsteroidData} = require('../repository/nasaApi');
const {formatAsteroidData} = require('../utils/utils');

async function getAsteroidData(apiUrl, apiKey, startDate, endDate, includeSentryObjectsCount, checkDangerousMeteors) {
    const data = await fetchAsteroidData(apiUrl, apiKey, startDate, endDate);
    const asteroids = data.near_earth_objects;

    let formattedData = Object.keys(asteroids)
        .flatMap(date => formatAsteroidData(asteroids[date]));

    let response = { data: formattedData };

    if (checkDangerousMeteors) {
        const hasDangerousMeteors = Object.keys(asteroids)
            .flatMap(date => asteroids[date])
            .some(asteroid => asteroid.is_potentially_hazardous_asteroid);

        if (hasDangerousMeteors) {
            response.wereDangerousMeteors = true;
        }
    }

    if (includeSentryObjectsCount) {
        let sentryAsteroids = Object.keys(asteroids)
            .flatMap(date => asteroids[date])
            .filter(asteroid => asteroid.is_sentry_object);

        if (sentryAsteroids.length > 0) {
            response.sentryObjectsCount = sentryAsteroids.length;
        }
    }

    return response;
}

module.exports = {getAsteroidData};
