import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import UsersRepository from '../repositories/UsersRepository'


export default async (req:Request, res:Response, next:NextFunction) => {
    const id = req.user_id

    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findOne({id})

    if(!user.admin){
        return res.status(401).json({error:"Unauthorized"})
    }
    
    return next()
}