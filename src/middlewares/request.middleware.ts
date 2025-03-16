import { NextFunction, Request, Response } from 'express'
import { inputSchema } from '~/validators/input.validate'
import { loginSchema, registerSchema } from '~/validators/user.validate'

export const inputRequestValidate = (req: Request, res: Response, next: NextFunction) => {
  const validate = inputSchema.validate(req.body)
  if (validate.error) {
    res.status(400).json(validate.error.details)
    return
  }
  next()
}

export const registerRequestValidate = (req: Request, res: Response, next: NextFunction) => {
  const validate = registerSchema.validate(req.body)
  if (validate.error) {
    res.status(400).json(validate.error.details)
    return
  }
  next()
}

export const loginRequestValidate = (req: Request, res: Response, next: NextFunction) => {
  const validate = loginSchema.validate(req.body)
  if (validate.error) {
    res.status(400).json(validate.error.details)
    return
  }
  next()
}
