import {Router} from 'express'
import ListTagsController from './controllers/ListTagsController'
import CreateTagController from './controllers/CreateTagController'
import ListUsersController from './controllers/ListUsersController'
import CreateUserController from './controllers/CreateUserController'
import ensureAuthMiddleware from './middlewares/ensureAuthMiddleware'
import ensureAdminMiddleware from './middlewares/ensureAdminMiddleware'
import GenUserTokenController from './controllers/GenUserTokenController'
import CreateComplimentController from './controllers/CreateComplimentController'
import ListUserSendedComplimentsController from './controllers/ListUserSendedComplimentsController'
import ListUserReceivedComplimentsController from './controllers/ListUserReceivedComplimentsController'

const router = Router()

// ============ Users routes ==============
router.post("/users/signup", CreateUserController.execute)

router.post("/users/signin", GenUserTokenController.execute)

router.get("/users", ensureAuthMiddleware,ListUsersController.execute)

// ========================================

router.post("/tags", ensureAuthMiddleware, ensureAdminMiddleware, CreateTagController.execute)

router.get("/tags", ListTagsController.execute)

router.post("/compliments", ensureAuthMiddleware, CreateComplimentController.execute)

router.get("/compliments/received", ListUserReceivedComplimentsController.execute)
router.get("/compliments/sended", ListUserSendedComplimentsController.execute)

export default router