import { Request, Response } from 'express'
import ListUserReceivedComplimentsService from '../services/ListUserReceivedComplimentsService'

class ListUserReceivedComplimentsController{
    async execute(req:Request, res:Response){
        const user_id = req.query.user_id as string

        const compliments = await ListUserReceivedComplimentsService.execute(user_id)

        return res.json({compliments})
    }
}

export default new ListUserReceivedComplimentsController()