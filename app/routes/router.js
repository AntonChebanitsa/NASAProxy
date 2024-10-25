const express = require('express');
const meteorsController = require('./controllers/meteor.controller');
const roverController = require('./controllers/roverImage.controller');

const router = express.Router();

router.use(meteorsController);
router.use(roverController);

module.exports = router;