"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const registerUser = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: "Name is required" })
        .min(5, { message: "Name must be 5 characters logn!" }),
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .min(5, { message: "Pasword must be 6 characters" }),
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .email({ message: "Please Provide a valid email" }),
});
exports.userValidation = { registerUser };
