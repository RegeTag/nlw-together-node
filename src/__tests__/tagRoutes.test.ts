import request from 'supertest'
import createConnection from '../database'
import app from '../app'

const tag = {
    "name": "Liderança"
}

describe("tag routes", () => {
    beforeAll(async () => {
        await createConnection().then( async connection => {
            await connection.runMigrations()
        })
    })

    it("create a tag", async () => {
        const response = await request(app).post("/tags").send(tag)

        if(response.status == 400){
            console.log(response)
        }

        expect(response.status).toBe(201)
    })
})