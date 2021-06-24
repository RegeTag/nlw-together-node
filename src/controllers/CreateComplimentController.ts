import CreateComplimentService from "../services/CreateComplimentService";
import { Request, Response } from "express";

class CreateComplimentController{
    async execute(req:Request, res:Response){
        const { user_receiver, user_sender,tag_id, message } = req.body

        const compliment = await CreateComplimentService.execute({tag_id, message, user_receiver, user_sender})

        return res.json({compliment})
    }
}

export default new CreateComplimentController()