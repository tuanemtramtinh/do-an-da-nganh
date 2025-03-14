import Joi from 'joi'

export const inputSchema = Joi.object({
  F: Joi.number().required(),
  v: Joi.number().required(),
  z: Joi.number().required(),
  p: Joi.number().required(),
  L: Joi.number().required(),
  t1: Joi.number().required(),
  t2: Joi.number().required(),
  T1: Joi.number().required(),
  T2: Joi.number().required()
})
