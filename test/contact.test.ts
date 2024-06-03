import supertest from "supertest"
import { ContactTest, UserTest } from "./test-util"
import { web } from "../src/application/web"
import { logger } from "../src/application/logging"

describe.only('POST /api/contacts', () => {
    beforeEach(async () => {
        await UserTest.delete()
        await UserTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should create new contact', async () => {
        const response = await supertest(web)
            .post('/api/contacts')
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "surya",
                last_name: "dharma",
                email: "surya@mail.com",
                phone: "0877690123"
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.first_name).toBe("surya")
        expect(response.body.data.last_name).toBe("dharma")
        expect(response.body.data.email).toBe("surya@mail.com")
        expect(response.body.data.phone).toBe("0877690123")
    })

    it('should reject create new contact if data is invalid', async () => {
        const response = await supertest(web)
            .post('/api/contacts')
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "",
                last_name: "",
                email: "surya.com",
                phone: "08776901221223214431242241413"
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })
})
