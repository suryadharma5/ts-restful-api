"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = void 0;
// ngikutin schema prisma kita yang User
function toUserResponse(user) {
    return {
        name: user.name,
        username: user.username
    };
}
exports.toUserResponse = toUserResponse;
