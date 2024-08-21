import Joi from 'joi';

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(3).max(255);
const category = Joi.string().min(3).max(50);
const image = Joi.string().uri();

const reviewSchema = Joi.object({
  reviewID: Joi.string().uuid().required(),
  userName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  comment: Joi.string().min(3).max(1000).required(),
  date: Joi.date().iso().required(),
});

export const createProductDTO = Joi.object({
  id: id.required(),
  name: name.required(),
  price: price.required(),
  description: description.required(),
  category: category.required(),
  image: image.required(),
  review: reviewSchema,
});

export const updateProductDTO = Joi.object({
  name,
  price,
  description,
  category,
  image,
  review: reviewSchema.optional(),
});

export const getProductDTO = Joi.object({
  id: id.required(),
});
