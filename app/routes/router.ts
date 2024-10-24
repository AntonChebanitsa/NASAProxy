import express, { Request, Response, NextFunction } from 'express';
import meteorsController from './controllers/meteor.controller';
import roverImageController from './controllers/roverImage.controller';
import validateRequest from '../middleware/validationMiddleware';
import { roverImageSchema, meteorsSchema } from '../validation/schemas';

const router = express.Router();

router.post('/rover-image', validateRequest(roverImageSchema), (req: Request, res: Response, next: NextFunction) => {
  roverImageController(req, res, next);
});

router.get('/meteors', validateRequest(meteorsSchema), (req: Request, res: Response, next: NextFunction) => {
  meteorsController(req, res, next);
});

export default router;
