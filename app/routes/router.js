const express = require('express');
const meteorsController = require('./controllers/meteor.controller');
const roverImageController = require('./controllers/roverImage.controller');
const validateRequest = require("../middleware/validationMiddleware");
const {meteorsSchema, roverImageSchema} = require("../validation/schemas");

const router = express.Router();

router.post('/rover-image', validateRequest(roverImageSchema), roverImageController);
router.get('/meteors', validateRequest(meteorsSchema), meteorsController);

module.exports = router;