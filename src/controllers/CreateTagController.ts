import { Request, Response } from 'express'
import CreateTagService from '../services/CreateTagService'

class CreateTagController {
    async execute(req: Request, res: Response){
        const {name} = req.body
        
        const tag = await CreateTagService.execute(name)

        return res.status(201).json(tag)
    }
}

export default new CreateTagController()