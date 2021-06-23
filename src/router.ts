import {Router} from 'express'
import CreateTagController from './controllers/CreateTagController'
import CreateUserController from './controllers/CreateUserController'
import ensureAdminMiddleware from './middlewares/EnsureAdminMiddleware'

const router = Router()

router.post("/users", CreateUserController.execute)

router.post("/tags", ensureAdminMiddleware, CreateTagController.execute)

export default router