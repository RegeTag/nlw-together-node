import { getCustomRepository } from "typeorm"
import UsersRepository from "../repositories/UsersRepository"
import { hash } from 'bcryptjs'

interface IUserRequest{
    name:string
    email:string
    password:string
    admin?:boolean
}

class CreateUserService{
    async execute({name, email, password, admin = false}:IUserRequest){
        const usersRepository = getCustomRepository(UsersRepository)

        if(!email){
            throw new Error("Email incorrect!")
        }

        // ============ Chech If User Exist

        const userAlreadyExists = await usersRepository.findOne({email})

        if(userAlreadyExists){
            throw new Error("User already exists!")
        }

        const passwordHash = await hash(password, 8)

        // =============

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash
        })

        await usersRepository.save(user)

        delete user.password

        return user
    }
}

export default new CreateUserService()