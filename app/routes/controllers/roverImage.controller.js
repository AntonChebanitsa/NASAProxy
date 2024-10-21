const Exception = require("../../customExceptions/Exception");
const express = require("express");
const {getMostRecentRoverImage} = require("../../services/roverImage.service");
const {nasaApiUrl} = require('../../config/config');

const router = express.Router();

const roverImageController = async (req, res, next) => {
    try {
        const {apiKey} = req.body;
        const imageUrl = await getMostRecentRoverImage(nasaApiUrl, apiKey);
        res.render('mostRecentRoverImage', {imageUrl});
    } catch (error) {
        next(new Exception(error.statusCode || 500, error.message));
    }
};

module.exports = roverImageController;
