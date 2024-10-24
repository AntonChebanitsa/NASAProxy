import { Response } from 'express';

function errorHandler(err: any, res: Response): void{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  console.error(err.stack);
  res.status(statusCode).json({ message });
}

export default errorHandler;
