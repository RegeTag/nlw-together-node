import { getCustomRepository } from "typeorm"
import ComplimentsRepository from "../repositories/ComplimentsRepository"
import TagsRepository from "../repositories/TagsRepository"
import UsersRepository from "../repositories/UsersRepository"

interface IComplimentRequest{
    tag_id:string
    user_receiver:string
    user_sender:string
    message?:string
}

class CreateComplimentService{
    async execute({ tag_id, user_sender, user_receiver, message = null }:IComplimentRequest){
        if(!tag_id || !user_sender || !user_receiver){
            throw new Error("Not enough arguments!")
        }

        if( user_receiver === user_sender ){
            throw new Error("Impossible to send a compliment for your self!")
        }
        
        const complimentsRepository = getCustomRepository(ComplimentsRepository)
        const usersRepository = getCustomRepository(UsersRepository)
        const tagsRepository = getCustomRepository(TagsRepository)

        const tag = await tagsRepository.findOne({id: tag_id})
        
        if(!tag){
            throw new Error("Invalid tag_id!")
        }

        const userSender = await usersRepository.findOne({id:user_sender})
        
        if(!userSender){
            throw new Error("Invalid user sender!")
        }

        const userReceiver = await usersRepository.findOne({id:user_receiver})

        if(!userReceiver){
            throw new Error("Invalid user receiver!")
        }

        const compliment = complimentsRepository.create({
            message,
            tag_id,
            user_receiver,
            user_sender
        })

        await complimentsRepository.save(compliment)

        return compliment
    }
}

export default new CreateComplimentService()