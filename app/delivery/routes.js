const express = require('express');
const { getAsteroidData } = require('../usecases/getAsteroidData');
const { nasaApiUrl, nasaApiKey } = require('../../config');
const fetchingMeteorsException = require("../customExceptions/fetchingMeteorsException");

const router = express.Router();

router.get('/meteors', async (req, res, next) => {
    try {
        const data = await getAsteroidData(nasaApiUrl, nasaApiKey);
        res.json(data);
    } catch (error) {
        next(new fetchingMeteorsException());
    }
});

module.exports = router;
