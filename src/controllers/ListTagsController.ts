import { Request, Response } from 'express'
import ListTagsService from '../services/ListTagsService'

class ListTagsController{
    async execute(req:Request, res:Response){
        const tags = await ListTagsService.execute()

        return res.json({tags})
    }
}

export default new ListTagsController()