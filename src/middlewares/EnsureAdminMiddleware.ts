import { Request, Response, NextFunction } from 'express'

export default (req:Request, res:Response, next:NextFunction) => {
    const admin = true 

    if(admin == true){
        return next()
    }
    
    return res.status(401).json({error:"Unauthorized"})
}