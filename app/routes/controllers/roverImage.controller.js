const Exception = require("../../customExceptions/Exception");
const {getMostRecentRoverImage} = require("../../services/roverImage.service");
const {nasaApiUrl} = require('../../config/config');

const roverImageController = async (req, res, next) => {
    try {
        const {apiKey} = req.body;

        if (!apiKey || typeof apiKey !== 'string') {
            return res.status(400).json({ message: 'Valid API key is required' });
        }

        const imageUrl = await getMostRecentRoverImage(nasaApiUrl, apiKey);
        res.render('mostRecentRoverImage', { imageUrl });
    } catch (error) {
        if (error.response && error.response.status === 403) {
            return next(new Exception(403, 'Invalid API key or rate limit exceeded'));
        }
        next(new Exception(error.statusCode || 500, error.message));
    }
};

module.exports = roverImageController;
