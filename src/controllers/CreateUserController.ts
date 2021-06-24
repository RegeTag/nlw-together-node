import {Request, Response} from 'express'
import CreateUserService from '../services/CreateUserService'

class CreateUserController{
    async execute(req:Request, res:Response){

        const {name, email, admin, password} = req.body

        
        const user = await CreateUserService.execute({name, email, admin, password})
        
        return res.status(201).json(user)
    }
}

export default new CreateUserController()