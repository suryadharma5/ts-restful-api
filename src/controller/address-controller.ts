import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateAddressRequest, GetAddressRequest, RemoveAddressRequest, UpdateAddressRequest } from "../model/address-model";
import { AddressService } from "../service/address-service";
import { logger } from "../application/logging";

export class AddressController {
    static async create(req: UserRequest, res: Response, next: NextFunction){
        try {
            const request: CreateAddressRequest = req.body as CreateAddressRequest
            request.contact_id = Number(req.params.contactId)

            const response = await AddressService.create(req.user!, request)
            logger.debug("response: " + JSON.stringify(response))
            res.status(200).json({
                data: response
            })
        } catch (e) {
            logger.error("error: " + e)
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction){
        try {
            const request: GetAddressRequest = {
                id: Number(req.params.addressId),
                contact_id: Number(req.params.contactId),
            }

            const response = await AddressService.get(req.user!, request)
            logger.debug("response: " + JSON.stringify(response))
            res.status(200).json({
                data: response
            })
        } catch (e) {
            logger.error("error: " + e)
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction){
        try {
            const request: UpdateAddressRequest = req.body as UpdateAddressRequest
            request.contact_id = Number(req.params.contactId)
            request.id = Number(req.params.addressId)

            const response = await AddressService.update(req.user!, request)
            logger.debug("response: " + JSON.stringify(response))
            res.status(200).json({
                data: response
            })
        } catch (e) {
            logger.error("error: " + e)
            next(e)
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: RemoveAddressRequest = req.body as RemoveAddressRequest
            request.contact_id = Number(req.params.contactId)
            request.id = Number(req.params.addressId)

            const response = await AddressService.remove(req.user!, request)
            logger.debug(response)

            return res.status(200).json({
                data: "OK"
            })
        } catch (e) {
            next(e)
        }
    }
}