import {Request, Response} from 'express'
import CreateUserService from '../services/CreateUserService'

class CreateUserController{
    async execute(req:Request, res:Response){
        const {name, email, admin} = req.body
        
        try {
            const user = await CreateUserService.execute({name, email, admin})
            
            return res.status(201).json(user)
        } catch (error) {

            return res.status(400).json({"error": error})
        }
    }
}

export default new CreateUserController()