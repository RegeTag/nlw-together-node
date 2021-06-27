import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export default (req:Request, res:Response, next:NextFunction) => {
    let token = req.headers.authorization
    
    if(!token){
        return res.status(401).json({error:"Unauthorized"})
    }
    
    token = token.replace("Bearer ", "")
    
    try {
        const decoded = verify(token, process.env.JWT_SECRET_KEY)
        
        req.user_id = decoded.sub as string
        
    } catch (error) {
        return res.status(401).json({error:"Unauthorized"})
    }

    return next()
}