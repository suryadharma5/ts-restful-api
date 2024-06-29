import { User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, toAddressResponse } from "../model/address-model";
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

    static async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
        const getRequest = validation.validate(AddressValidation.GET, request)

        await ContactService.checkIfContactExist(user.username, request.contact_id)

        const address = await prismaClient.address.findFirst({
            where: {
                id: getRequest.id,
                contact_id: getRequest.contact_id
            }
        })

        if(!address){
            throw new ResponseError(404, "Address is not found")
        }

        return toAddressResponse(address)
    }
}