import { Request, Response } from 'express'
import ListUsersService from '../services/ListUsersService'


class ListUsersController {
    async execute(req:Request, res:Response){
        const users = await ListUsersService.execute()

        return res.json({users})
    }
}

export default new ListUsersController()