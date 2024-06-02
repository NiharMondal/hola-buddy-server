"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileValidation = void 0;
const zod_1 = require("zod");
const createProfile = zod_1.z.object({
    bio: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    age: zod_1.z.number().optional(),
});
exports.profileValidation = { createProfile };
