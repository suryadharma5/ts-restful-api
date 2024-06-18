import supertest from "supertest"
import { ContactTest, UserTest } from "./test-util"
import { web } from "../src/application/web"
import { logger } from "../src/application/logging"
import { log } from "winston"

describe('POST /api/contacts', () => {
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

describe('GET /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to get contact', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.first_name).toBe(contact.first_name)
        expect(response.body.data.last_name).toBe(contact.last_name)
        expect(response.body.data.email).toBe(contact.email)
        expect(response.body.data.phone).toBe(contact.phone)
    })

    it('should not be able to get contact if contact is not found', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})

describe('/api/contacts/:contactId', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to update contact', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set('X-API-TOKEN', 'test')
            .send({
                first_name: "Surya",
                last_name: "Setiawan",
                email: "suryas@mail.com",
                phone: "081136712"
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(contact.id)
        expect(response.body.data.first_name).toBe("Surya")
        expect(response.body.data.last_name).toBe("Setiawan")
        expect(response.body.data.email).toBe("suryas@mail.com")
        expect(response.body.data.phone).toBe("081136712")
    })

    it('should reject update contact if request is invalid', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set('X-API-TOKEN', 'test')
            .send({
                first_name: "",
                last_name: "",
                email: "suryas",
                phone: ""
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

})


