import { Contact, User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, UpdateContactRequest, toContactResponse } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { validation } from "../validation/validation-helper";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

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

    static async checkIfContactExist(username: string, contactId: number): Promise<Contact> {
        const contact = await prismaClient.contact.findUnique({
            where: {
                id: contactId,
                username: username
            }
        })

        if (!contact) {
            throw new ResponseError(404, "Contact not Found")
        }

        return contact
    }

    static async get(user: User, id: number): Promise<ContactResponse> {
        const contact = await this.checkIfContactExist(user.username, id)

        return toContactResponse(contact)
    }

    static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse> {
        const updateRequest = validation.validate(ContactValidation.UPDATE, request)
        await this.checkIfContactExist(user.username, updateRequest.id)

        const contact = await prismaClient.contact.update({
            where: {
                id: updateRequest.id,
                username: user.username
            },
            data: updateRequest
        })

        return toContactResponse(contact)
    }

    static async remove(user: User, id: number): Promise<ContactResponse>{
        await this.checkIfContactExist(user.username, id);

        const contact = await prismaClient.contact.delete({
            where: {
                id: id,
                username: user.username
            }
        })

        return toContactResponse(contact)
    }
}