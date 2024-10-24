import { fetchAsteroidData } from '../repositories/meteor.repository';
import { formatAsteroidData } from '../utils/utils';
import { AsteroidData, ResponseData } from './types';

async function getAsteroidData(
  apiUrl: string | undefined,
  apiKey: string | undefined,
  startDate: string,
  endDate: string,
  includeSentryObjectsCount: boolean,
  checkDangerousMeteors: boolean
): Promise<ResponseData> {
    const data: AsteroidData = await fetchAsteroidData(apiUrl, apiKey, startDate, endDate);
    const asteroids = data.near_earth_objects;

    const formattedData = Object.values(asteroids).flatMap(formatAsteroidData);
    const response: ResponseData = { data: formattedData };

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

export { getAsteroidData };
