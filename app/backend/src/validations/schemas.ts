import * as Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(6).required(),
}).messages({
  'any.required': 'All fields must be filled',
});

export const addUserSchema = Joi.object({
  username: Joi.string().min(3).required(),
  classe: Joi.string().min(3).required(),
  level: Joi.number().min(1).required(),
  password: Joi.string().min(8).required(),
});
