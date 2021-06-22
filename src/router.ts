import {Router} from 'express'
import CreateUserController from './controllers/CreateUserController'

const router = Router()

router.post("/user", CreateUserController.execute)

export default router