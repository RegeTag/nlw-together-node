import createConnection from '../database'
import request from 'supertest'
import app from "../app"
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
        password:"123",
        jwt:null
    },
    tag:{
        id:null,
        name:"Expert"
    },
    tag2:{
        id:null,
        name:"Helpful"
    },
}

beforeAll(async () => {
    await createConnection().then( async connection => {
        await connection.runMigrations()
    })
})

describe("Services", () => {
    describe("Should be able to:", () => {
        describe("Create user:", () => {
            it("user1 (Admin)", async () => {
                let user:User
        
                try {
                    user = await CreateUserService.execute(data.user1)
                    
                    data.user1.id = user.id
        
                    expect(user).toBeInstanceOf(User)
                    expect(user).toHaveProperty("id")

                } catch (error) {
                    console.error(error)
                }
        
            })
        
            it("user2 (Not admin)", async () => {
                let user:User
        
                try {
                    user = await CreateUserService.execute(data.user2)
        
                    data.user2.id = user.id
                    
                    expect(user).toBeInstanceOf(User)
                    expect(user).toHaveProperty("id")
                
                } catch (error) {
                    console.error(error)
                }
            })
        })

        describe("Create tag:", () => {
            it("Expert" , async () => {
                try{
                    const tag = await CreateTagService.execute(data.tag.name)
        
                    data.tag.id = tag.id

                    expect(tag).toBeInstanceOf(Tag)
                    expect(tag).toHaveProperty("id")

                } catch(error){
                    console.error(error)
                }
            })
        })
    
        describe("Get JWT:", () => {
            it("user1", async () => {
                try {
                    const token = await GenUserTokenService.execute(data.user1)

    
                    data.user1.jwt = token

                    expect(data.user1.jwt).not.toBe(null)
                } catch (error) {
                    console.error(error)
                }
            })
            
            it("user2", async () => {
                try {

                    const token = await GenUserTokenService.execute(data.user2)
    
                    data.user2.jwt = token

                    expect(data.user2.jwt).not.toBe(null)
                } catch (error) {
                    console.error(error)
                }
            })
        })
    
        describe("Send compliment:", () => {
            it("user1 send compliment 'Expert' to user2 without message", async () => {
                expect(data.tag.id).not.toBe(null)
                expect(data.user1.id).not.toBe(null)
                expect(data.user2.id).not.toBe(null)
    
                try {
                    const compliment = await CreateComplimentService.execute({
                        tag_id: data.tag.id,
                        user_sender: data.user1.id,
                        user_receiver: data.user2.id
                    })
                    
                    expect(compliment).toBeInstanceOf(Compliment)
                } catch (error) {
                    console.error(error)
                }
            })

            it("user2 send compliment 'Expert' to user1 with message", async () => {
                expect(data.tag.id).not.toBe(null)
                expect(data.user1.id).not.toBe(null)
                expect(data.user2.id).not.toBe(null)
    
                try {
                    const compliment = await CreateComplimentService.execute({
                        tag_id: data.tag.id,
                        user_sender: data.user1.id,
                        user_receiver: data.user2.id,
                        message:"Nice!"
                    })
    
                    expect(compliment).toBeInstanceOf(Compliment)
                } catch (error) {
                    console.error(error)
                }
    
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
            
            expect(user).not.toBeInstanceOf(User)
        })
    })
})

describe("Routes", () => {
    describe("Should be able to:", () => {
        it("Create tag with admin JWT", async () => {
            const response = await request(app)
                .post("/tags")
                .set({"authorization":"Bearer " + data.user1.jwt})
                .send({name:data.tag2.name})

            data.tag2.id = response.body.id
            
            expect(data.tag2.id).not.toBe(null)
            expect(response.status).toBe(201)
        })
        
        it("Send a compliment with JWT", async () => {
            const response = await request(app)
                .post("/compliments")
                .set({"authorization":"Bearer " + data.user2.jwt})
                .send({
                    tag_id: data.tag.id, 
                    message:"Nice", 
                    user_receiver:data.user1.id, 
                })

            expect(response.status).toBe(200)
        })
    })
    
    describe("Shouldn't be able to:", () => {
        it("Create tag with non admin JWT", async () => {
            const response = await request(app)
                .post("/tags")
                .set({"authorization":"Bearer " + data.user2.jwt})
                .send({name:"Nice"})
    
            expect(response.status).toBe(401)
        })
    })
})