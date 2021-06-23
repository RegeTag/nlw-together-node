import request from 'supertest'
import createConnection from '../database'
import app from '../app'

const user = {
    "name":"test",
    "email":"test@jest.com",
    "admin":true
}

describe("user routes", () => {
    beforeAll(async () => {
        await createConnection().then( async connection => {
            await connection.runMigrations()
        })
    })


    it("create a user", async () => {
        const response = await request(app).post("/users").send(user)

        expect(response.status).toBe(201)
    })

    it("cannot create the same user", async () => {
        const response = await request(app).post("/users").send(user)

        expect(response.status).toBe(400)
    })
})


export { user }