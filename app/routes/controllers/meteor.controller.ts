import Exception from '../../customExceptions/exception';
import { getAsteroidData } from '../../services/meteor.service';
import { Request, Response, NextFunction } from 'express';
import config from '../../config';
import { calculateDateRange } from '../../utils/utils';

interface QueryParams {
  date?: string;
  sentry_objects_count?: string;
  were_dangerous_meteors?: string;
}

const meteorsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date, sentry_objects_count, were_dangerous_meteors } = req.query as QueryParams;
    const parsedDate = date ? JSON.parse(date) : undefined;
    const { startDate, endDate } = calculateDateRange(parsedDate);

    const checkSentryObjectsCount = sentry_objects_count?.trim() === 'true';
    const checkDangerousMeteors = were_dangerous_meteors?.trim() === 'true';

    const data = await getAsteroidData(config.nasaApiUrl, config.nasaApiKey, startDate, endDate, checkSentryObjectsCount, checkDangerousMeteors);

    res.render('meteors', {
      data: data.data,
      wereDangerousMeteors: data.wereDangerousMeteors,
      sentryObjectsCount: data.sentryObjectsCount,
    });
  } catch (error: any) {
    next(new Exception(error.statusCode || 500, error.message));
  }
};

export default meteorsController;
