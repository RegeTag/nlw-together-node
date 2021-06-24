import { getCustomRepository } from "typeorm"
import UsersRepository from "../repositories/UsersRepository"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface Iuser{
    email:string
    password:string
}

class GenUserToken{
    async execute({email, password}:Iuser){
        if(!email || !password){
            throw new Error("Email or password invalid!")
        }

        const usersRepository = getCustomRepository(UsersRepository)

        const user = await usersRepository.findOne({email})

        if(!user){
            throw new Error("Email or password invalid!")
        }

        const isPasswordValid = await compare(password, user.password)

        if(!isPasswordValid){
            throw new Error("Email or password invalid!")
        }

        const token = sign({email}, process.env.JWT_SECRET_KEY, {subject:user.id, expiresIn:"1d"})

        return token
    }

}

export default new GenUserToken()
export { Iuser }