import { Request, Response } from 'express'
import ListUserSendedComplimentsService from '../services/ListUserSendedComplimentsService'

class ListUserSendedComplimentsController{
    async execute(req:Request, res:Response){
        const user_id = req.query.user_id as string

        const compliments = await ListUserSendedComplimentsService.execute(user_id)

        return res.json({compliments})
    }
}

export default new ListUserSendedComplimentsController()