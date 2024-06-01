import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest, UserResponse, toUserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { validation } from "../validation/validation-helper";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

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

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = validation.validate(UserValidation.LOGIN, request)

        let user = await prismaClient.user.findUnique({
            where: {
                username: loginRequest.username
            }
        })

        if (!user) {
            throw new ResponseError(401, "Username or password is wrong")
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)

        if (!isPasswordValid) {
            throw new ResponseError(401, "Username or password is wrong")
        }

        user = await prismaClient.user.update({
            where: {
                username: loginRequest.username
            },
            data: {
                token: uuid()
            }
        })

        const response = toUserResponse(user)
        response.token = user.token!

        return response
    }

    static async get(user: User): Promise<UserResponse> {
        return toUserResponse(user)
    }

    static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = validation.validate(UserValidation.UPDATE, request)

        if (updateRequest.name) {
            user.name = updateRequest.name
        }

        if (updateRequest.password) {
            user.password = await bcrypt.hash(updateRequest.password, 10)
        }

        const result = await prismaClient.user.update({
            where: {
                username: user.username
            },
            data: user
        })

        return toUserResponse(result)
    }

    static async logout(user: User): Promise<UserResponse> {
        const result = await prismaClient.user.update({
            where: {
                username: user.username
            },
            data: {
                token: null
            }
        })

        return toUserResponse(result)
    }
}
