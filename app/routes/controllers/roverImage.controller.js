const Exception = require("../../customExceptions/Exception");
const express = require("express");
const {getMostRecentRoverImage} = require("../../services/roverImage.service");
const {nasaApiUrl} = require('../../config/config');

const router = express.Router();

router.post('/rover-image', async (req, res, next) => {
    try {
        const {apiKey} = req.body;

        if (!apiKey) {
            return res.status(400).json({message: 'API key is required'});
        }

        const imageUrl = await getMostRecentRoverImage(nasaApiUrl, apiKey);

        res.render('mostRecentRoverImage', {imageUrl});
    } catch (error) {
        next(new Exception(error.statusCode || 500, error.message));
    }
});

module.exports = router;