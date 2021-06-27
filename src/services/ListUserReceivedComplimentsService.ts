import { getCustomRepository } from "typeorm"
import ComplimentsRepository from "../repositories/ComplimentsRepository"
import UsersRepository from "../repositories/UsersRepository"


class ListUserReceivedComplimentsService{
    async execute(user_id:string){
        if(!user_id){
            throw new Error("Invalid user!")
        }
        
        const usersRepository = getCustomRepository(UsersRepository)
        const complimentsRepository = getCustomRepository(ComplimentsRepository)
        
        const user = await usersRepository.findOne({id: user_id})
        
        if(!user){
            throw new Error("Invalid user!")
        }

        const compliments = await complimentsRepository.find({where:{user_receiver: user.id}})

        return compliments
    }
}

export default new ListUserReceivedComplimentsService()