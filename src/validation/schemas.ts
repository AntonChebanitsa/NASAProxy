﻿import Joi from 'joi';

export const roverImageSchema = Joi.object({
  apiKey: Joi.string().required().messages({
    'string.empty': 'API key is required',
    'any.required': 'API key is required',
  }),
});

export const meteorsSchema = Joi.object({
  date: Joi.string().optional(),
  sentry_objects_count: Joi.string().optional(),
  were_dangerous_meteors: Joi.string().optional(),
});