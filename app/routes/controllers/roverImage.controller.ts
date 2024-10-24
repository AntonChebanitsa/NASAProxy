import Exception from '../../customExceptions/exception';
import { getMostRecentRoverImage } from '../../services/roverImage.service';
import { Request, Response, NextFunction } from 'express';
import config from '../../config';

const roverImageController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { apiKey } = req.body;
    const imageUrl = await getMostRecentRoverImage(config.nasaApiUrl, apiKey);
    res.render('mostRecentRoverImage', { imageUrl });
  } catch (error: any) {
    next(new Exception(error.statusCode || 500, error.message));
  }
};

export default roverImageController;
