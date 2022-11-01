import joi from "joi";

const product = joi.object({
  title: joi.string().min(3).max(45).required(),
  description: joi.string().min(5).max(100).required(),
  code: joi.string().min(3).required(),
  thumbnail: joi.string().min(3).max(250).required(),
  price: joi.number().min(1).required(),
  stock: joi.number().min(1).required(),
  timestamp: joi.string().required(),
});

export const JOI_VALIDATOR = { product };
