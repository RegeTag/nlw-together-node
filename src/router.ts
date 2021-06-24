import {Router} from 'express'
import CreateTagController from './controllers/CreateTagController'
import CreateUserController from './controllers/CreateUserController'
import ensureAdminMiddleware from './middlewares/EnsureAdminMiddleware'
import GenUserTokenController from './controllers/GenUserTokenController'
import CreateComplimentController from './controllers/CreateComplimentController'

const router = Router()

router.post("/users", CreateUserController.execute)

router.post("/tags", ensureAdminMiddleware, CreateTagController.execute)

router.post("/signin", GenUserTokenController.execute)

router.post("/compliments", CreateComplimentController.execute)

export default router