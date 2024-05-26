import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, UserResponse, toUserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { validation } from "../validation/validation-helper";
import bcrypt from "bcrypt"

export class UserService {
    static async register(request: CreateUserRequest): Promise<UserResponse> {
        // do validation
        const registerRequest = validation.validate(UserValidation.REGISTER, request)

        // check if username exists in db
        const totalUserWithSameUserName = await prismaClient.user.count({
            where: {
                username: registerRequest.username
            }
        })

        if (totalUserWithSameUserName != 0) {
            throw new ResponseError(400, "Username already exists")
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

        // create user to db
        const user = await prismaClient.user.create({
            data: registerRequest
        })

        return toUserResponse(user)
    }
}