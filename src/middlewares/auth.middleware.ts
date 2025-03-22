import { NextFunction, Request, Response } from 'express'
import User from '~/models/user.model'
import { AuthService } from '~/services/auth.service'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authService = new AuthService()

  if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    res.status(400).json({ code: 'no_access_token', message: 'Vui lòng cung cấp AccessToken' })
    return
  }
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken: any = authService.verifyAccessToken(token)
  if (decodedToken === -1) {
    res.status(400).json({ code: 'expired_access_token', message: 'AccessToken hết hạn' })
    return
  } else if (decodedToken === 0) {
    res.status(400).json({ code: 'invalid_access_token', message: 'AccessToken không hợp lệ' })
    return
  }

  const existUser = await User.findById(decodedToken.id)

  if (!existUser) {
    res.status(400).json({ code: 'user_not_exist', message: 'Người dùng không tồn tại' })
    return
  }

  req.user = existUser

  next()
}
