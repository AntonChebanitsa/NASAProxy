const express = require('express');
const {getAsteroidData} = require('../usecases/getAsteroidData');
const {nasaApiUrl, nasaApiKey} = require('../../config');
const Exception = require("../customExceptions/Exception");
const {calculateDateRange} = require('../utils/utils');

const router = express.Router();

router.get('/meteors', async (req, res, next) => {
    try {
        const {start_date, end_date, sentry_objects_count, were_dangerous_meteors} = req.query;
        const {startDate, endDate} = calculateDateRange(start_date, end_date);

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
});

module.exports = router;
