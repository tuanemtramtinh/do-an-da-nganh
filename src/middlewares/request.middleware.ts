import { NextFunction, Request, Response } from 'express'
import { inputSchema } from '~/validators/input.validate'

export const inputRequestValidate = (req: Request, res: Response, next: NextFunction) => {
  const validate = inputSchema.validate(req.body)
  if (validate.error) {
    res.status(400).json(validate.error.details)
    return
  }
  next()
}
