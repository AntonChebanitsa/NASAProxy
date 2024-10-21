const {getAsteroidData} = require('../../services/meteor.service');
const {nasaApiUrl, nasaApiKey} = require('../../config/config');
const Exception = require("../../customExceptions/Exception");
const {calculateDateRange} = require('../../utils/utils');

const meteorsController = async (req, res, next) => {
    try {
        const { date, sentry_objects_count, were_dangerous_meteors } = req.query;
        const parsedDate = date ? JSON.parse(date) : undefined;
        const { startDate, endDate } = calculateDateRange(parsedDate);

        const checkSentryObjectsCount = sentry_objects_count?.trim() === 'true';
        const checkDangerousMeteors = were_dangerous_meteors?.trim() === 'true';

        const data = await getAsteroidData(nasaApiUrl, nasaApiKey, startDate, endDate, checkSentryObjectsCount, checkDangerousMeteors);

        res.render('meteors', {
            data: data.data,
            wereDangerousMeteors: data.wereDangerousMeteors,
            sentryObjectsCount: data.sentryObjectsCount
        });
    } catch (error) {
        next(new Exception(error.statusCode, error.message));
    }
};

module.exports = meteorsController;