const express = require('express');
const meteorsController = require('./controllers/meteor.controller');
const validateRequest = require("../middleware/validationMiddleware");
const {roverImageSchema, meteorsSchema} = require("../validation/schemas");
const roverImageController = require("./controllers/roverImage.controller");

const router = express.Router();

router.post('/rover-image', validateRequest(roverImageSchema), roverImageController);
router.get('/meteors', validateRequest(meteorsSchema), meteorsController);

module.exports = router;