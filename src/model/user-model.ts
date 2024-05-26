import { User } from "@prisma/client"

export type UserResponse = {
    username: string
    name: string
    token?: string
}

export type CreateUserRequest = {
    username: string
    name: string
    password: string
}

// ngikutin schema prisma kita yang User
export function toUserResponse(user: User): UserResponse {
    return {
        name: user.name,
        username: user.username
    }
}