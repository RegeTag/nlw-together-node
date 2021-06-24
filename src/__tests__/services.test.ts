import createConnection from '../database'
import Compliment from '../entities/Compliment'
import Tag from '../entities/Tag'
import User from '../entities/User'
import CreateComplimentService from '../services/CreateComplimentService'
import CreateTagService from '../services/CreateTagService'
import CreateUserService from '../services/CreateUserService'
import GenUserTokenService from '../services/GenUserTokenService'

const data = {
    user1: {
        id:null,
        name:"Test Admin",
        email:"admin@teste.com",
        password:"123",
        admin: true,
        jwt: null
    },
    user2:{
        id:null,
        name:"Not Admin",
        email:"Not@teste.com",
        password:"123"
    },
    tag:{
        id:null,
        name:"Expert"
    }
}

describe("Should be able to:", () => {
    beforeAll(async () => {
        await createConnection().then( async connection => {
            await connection.runMigrations()
        })
    })

    describe("Create:", () => {

        describe("user:", () => {
            it("user1", async () => {
                let user:User
        
                try {
                    user = await CreateUserService.execute(data.user1)
                    
                    data.user1.id = user.id
        
                } catch (error) {
        
                    console.error(error)
                }
        
                expect(user).toBeInstanceOf(User)
        
                expect(user).toHaveProperty("id")
            })
        
            it("user2", async () => {
                let user:User
        
                try {
                    user = await CreateUserService.execute(data.user2)
        
                    data.user2.id = user.id
        
                } catch (error) {
        
                    console.error(error)
                }
        
                expect(user).toBeInstanceOf(User)
        
                expect(user).toHaveProperty("id")
            })
        })

        describe("Tag:", () => {
            it("Tag 'Expert'" , async () => {
                let tag:Tag
        
                try{
                    tag = await CreateTagService.execute(data.tag.name)
        
                    data.tag.id = tag.id
                } catch(error){
                    console.error(error)
                }
        
                expect(tag).toBeInstanceOf(Tag)
        
                expect(tag).toHaveProperty("id")
        
            })
        })
    
    })

    describe("Get:", () => {
        it("User JWT", async () => {
            let token:string

            try {
                token = await GenUserTokenService.execute(data.user1)

                data.user1.jwt = token
            } catch (error) {
                console.error(error)
            }

            expect(data.user1.jwt).not.toBe(null)
        })
    })

    describe("Send:", () => {
        describe("compliment:", () => {
            it("user1 send compliment 'Expert' to user2", async () => {
                expect(data.tag.id).not.toBe(null)
                expect(data.user1.id).not.toBe(null)
                expect(data.user2.id).not.toBe(null)
    
                let compliment:Compliment
    
                try {
                    compliment = await CreateComplimentService.execute({
                        tag_id: data.tag.id,
                        user_sender: data.user1.id,
                        user_receiver: data.user2.id
                    })
    
                } catch (error) {
                    console.error(error)
                }
    
                expect(compliment).toBeInstanceOf(Compliment)
            })

        })
    })

})

describe("Shouldn't be able to:", () => {
    it("create a already existing user", async () => {
        let user:User

        try{
            user = await CreateUserService.execute(data.user1)
        }catch(error){
            
            expect(error).toBeInstanceOf(Error)
        }
    })
})