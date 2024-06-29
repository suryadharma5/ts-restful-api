import { Address, User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, UpdateAddressRequest, toAddressResponse } from "../model/address-model";
import { validation } from "../validation/validation-helper";
import { ContactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { AddressValidation } from "../validation/address-validation";
import { ResponseError } from "../error/response-error";

export class AddressService {
    static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
        const createRequest = validation.validate(AddressValidation.CREATE, request)

        // pastiin kontaknya ada
        await ContactService.checkIfContactExist(user.username, request.contact_id)

        const address = await prismaClient.address.create({
            data: createRequest
        })

        return toAddressResponse(address)
    }

    static async checkIfAddressExist(contactId: number, addressId: number): Promise<Address> {
        const address = await prismaClient.address.findFirst({
            where: {
                id: addressId,
                contact_id: contactId
            }
        })

        if(!address){
            throw new ResponseError(404, "Address is not found")
        }

        return address
    }

    static async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
        const getRequest = validation.validate(AddressValidation.GET, request)

        await ContactService.checkIfContactExist(user.username, request.contact_id)

        const address = await this.checkIfAddressExist(getRequest.contact_id, getRequest.id)

        return toAddressResponse(address)
    }

    static async update (user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
        const updateRequest = validation.validate(AddressValidation.UPDATE, request)
        await ContactService.checkIfContactExist(user.username, request.contact_id)
        await this.checkIfAddressExist(updateRequest.contact_id, updateRequest.id)

        const address = await prismaClient.address.update({
            where: {
                id: updateRequest.id,
                contact_id: updateRequest.contact_id
            },
            data : updateRequest
        })

        return toAddressResponse(address)
    }
}