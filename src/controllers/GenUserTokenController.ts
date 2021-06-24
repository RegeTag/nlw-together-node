import { Request, Response } from "express";
import GenUserTokenService from "../services/GenUserTokenService";


class GenUserTokenController {
    async execute(req:Request, res:Response){
        const { email, password } = req.body

        const token = await GenUserTokenService.execute({email, password})

        return res.json({token})
    }
}

export default new GenUserTokenController()