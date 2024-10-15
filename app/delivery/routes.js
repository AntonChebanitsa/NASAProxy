const express = require('express');
const { getAsteroidData } = require('../usecases/getAsteroidData');
const { nasaApiUrl, nasaApiKey } = require('../../config');
const Exception = require("../customExceptions/Exception");

const router = express.Router();

router.get('/meteors', async (req, res, next) => {
    try {
        const data = await getAsteroidData(nasaApiUrl, nasaApiKey);
        res.json(data);
    } catch (error) {
        next(new Exception(error.statusCode, error.message));
    }
});

module.exports = router;
