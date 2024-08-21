import Joi from 'joi';

const profileSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  avatar: Joi.string().uri().required(),
  email: Joi.string().email().required(),
  bio: Joi.string().max(1000).required(),
});

const addressSchema = Joi.object({
  county: Joi.string().min(3).max(50).required(),
  city: Joi.string().min(3).max(50).required(),
  streetAddress: Joi.string().min(3).max(100).required(),
});

const userSchema = Joi.object({
  id: Joi.string().uuid().required(),
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  phone: Joi.string().pattern(/^[\d\s()+-]+$/).min(7).max(20).required(),
  birth: Joi.date().iso().required(),
  profile: profileSchema.required(),
  address: addressSchema.required(),
});

export const createUserDTO = userSchema;

export const updateUserDTO = Joi.object({
  firstName: Joi.string().min(1).max(50),
  lastName: Joi.string().min(1).max(50),
  phone: Joi.string().pattern(/^[\d\s()+-]{7,15}$/),
  birth: Joi.date().iso(),
  profile: profileSchema.optional(),
  address: addressSchema.optional(),
});

export const getUserDTO = Joi.object({
  id: Joi.string().uuid().required()
});
