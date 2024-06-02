"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const login = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .email({ message: "You must provide a valid email" }),
    password: zod_1.z.string({ required_error: "Password is required" }),
});
const changePassword = zod_1.z.object({
    oldPassword: zod_1.z.string({ required_error: "Old password is required" }),
    newPassword: zod_1.z.string({ required_error: "New password is required" }),
    conPassword: zod_1.z.string({ required_error: "Confirm password is required" }),
});
exports.authValidation = { login, changePassword };
