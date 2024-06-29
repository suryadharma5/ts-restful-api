import supertest from "supertest"
import { UserTest, ContactTest, AddressTest } from "./test-util"
import { web } from "../src/application/web"
import { logger } from "../src/application/logging"

describe('POST /api/contacts/:contactId/addresses', () => {
    beforeEach(async () => {
        // await UserTest.delete()
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to create address', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Jalan jalan",
                city: "Jakarta",
                province: "DKI Jakarta",
                country: "Indonesia",
                postal_code: "11111"
            })
        
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.street).toBe("Jalan jalan")
        expect(response.body.data.city).toBe("Jakarta")
        expect(response.body.data.province).toBe("DKI Jakarta")
        expect(response.body.data.country).toBe("Indonesia")
        expect(response.body.data.postal_code).toBe("11111")
    })

    it('should not be able to create address if request is invalid', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Jalan jalan",
                city: "Jakarta",
                province: "DKI Jakarta",
                country: "",
                postal_code: ""
            })
        
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    it('should not be able to create address if contact is not found', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id + 1}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Jalan jalan",
                city: "Jakarta",
                province: "DKI Jakarta",
                country: "",
                postal_code: ""
            })
        
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })
})

describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
    beforeEach(async () => {
        // await UserTest.delete()
        await UserTest.create()
        await ContactTest.create()
        await AddressTest.create()
    })

    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to get address', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Jalan jalan",
                city: "Jakarta",
                province: "DKI Jakarta",
                country: "Indonesia",
                postal_code: "11111"
            })
        
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.street).toBe("Jalan jalan")
        expect(response.body.data.city).toBe("Jakarta")
        expect(response.body.data.province).toBe("DKI Jakarta")
        expect(response.body.data.country).toBe("Indonesia")
        expect(response.body.data.postal_code).toBe("11111")
    })

    it('should not be able to create address if request is invalid', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Jalan jalan",
                city: "Jakarta",
                province: "DKI Jakarta",
                country: "",
                postal_code: ""
            })
        
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    it('should not be able to create address if contact is not found', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id + 1}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Jalan jalan",
                city: "Jakarta",
                province: "DKI Jakarta",
                country: "",
                postal_code: ""
            })
        
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })
})