import { User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, toContactResponse } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { validation } from "../validation/validation-helper";
import { prismaClient } from "../application/database";

export class ContactService {
    static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
        const createRequest = validation.validate(ContactValidation.CREATE, request)

        const record = {
            ...createRequest,
            ...{ username: user.username }
        }

        // harus isi username, mengacu pada schema prisma
        const contact = await prismaClient.contact.create({
            data: record
        })

        return toContactResponse(contact)
    }
}