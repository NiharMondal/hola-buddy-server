import { z } from "zod";

const createProfile = z.object({
	bio: z.string().optional(),
	country: z.string().optional(),
	age: z
		.number()
		.positive({ message: "Age must be a positive value" })
		.optional(),
});

export const profileValidation = { createProfile };
