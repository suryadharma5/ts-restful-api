import { User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, toAddressResponse } from "../model/address-model";
import { validation } from "../validation/validation-helper";
import { ContactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { AddressValidation } from "../validation/address-validation";

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
}