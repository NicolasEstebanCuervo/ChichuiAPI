import Joi from "joi";

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const price = Joi.number().integer().min(10);
const img = Joi.string().uri()

export const createProductDTO = Joi.object({
  name:name.required(),
  price:price.required(),
  img:img.required(),
})

export const updateProductDTO = Joi.object({
  name:name,
  price:price,
  img:img
})

export const getProductDTO = Joi.object({
  id: id.required()
})
