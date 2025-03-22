import express, { Router } from 'express'
import { UserController } from '~/controllers/client/user.controller'
import { authMiddleware } from '~/middlewares/auth.middleware'
import User from '~/models/user.model'
import { AuthService } from '~/services/auth.service'
import { UserService } from '~/services/user.service'

const router: Router = express.Router()

const authService = new AuthService()
const userService = new UserService(User, authService)
const userController = new UserController(userService)

router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/info', authMiddleware, userController.getUserInfo)

const userRouter = router
export default userRouter
