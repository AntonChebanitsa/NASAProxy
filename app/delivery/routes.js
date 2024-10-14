const express = require('express');
const { getAsteroidData } = require('../usecases/getAsteroidData');

const router = express.Router();

router.get('/meteors', async (req, res) => {
    try {
        const apiUrl = process.env.NASA_API_URL;
        const apiKey = process.env.NASA_API_KEY;
        const data = await getAsteroidData(apiUrl, apiKey);
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching data from NASA API');
    }
});

module.exports = router;
