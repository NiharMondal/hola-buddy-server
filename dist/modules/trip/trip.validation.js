"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripValidation = void 0;
const zod_1 = require("zod");
const createTrip = zod_1.z.object({
    title: zod_1.z.string({ required_error: "Title is required" }),
    destination: zod_1.z.string({ required_error: "Destination is required" }),
    startDate: zod_1.z.string({ required_error: "Start date is required" }),
    endDate: zod_1.z.string({ required_error: "End date is required" }),
    description: zod_1.z.string({ required_error: "Description is required" }),
    budget: zod_1.z
        .number({ required_error: "Budget is required" })
        .positive({ message: "Budget must be positive" })
        .max(500000, { message: "Budget must be lest than 500000" }),
    photo: zod_1.z.string().optional(),
});
exports.tripValidation = { createTrip };
