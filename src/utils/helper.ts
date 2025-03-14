import { Response } from 'express'

export const successMessage = (res: Response, message: string, data?: any, statusCode: number = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  })
}

export const failedMessage = (res: Response, message: string, err?: any, statusCode: number = 400) => {
  return res.status(statusCode).json({
    success: false,
    message,
    err
  })
}
