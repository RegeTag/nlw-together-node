import { getCustomRepository } from "typeorm"
import TagsRepository from "../repositories/TagsRepository"


class CreateTagService{
    async execute(name:string){
        const tagsRepository = getCustomRepository(TagsRepository)        

        if(!name){
            throw new Error("Invalid tag!")
        }

        const tagAlreadyExists = await tagsRepository.findOne({name})

        if(tagAlreadyExists){
            throw new Error(`Tag ${name} already exists!`)
        }

        const tag = tagsRepository.create({
            name
        })

        await tagsRepository.save(tag)

        return tag

    }
}

export default new CreateTagService()