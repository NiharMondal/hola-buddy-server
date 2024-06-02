import { z } from "zod";

const createProfile = z.object({
	bio: z.string().optional(),
	country: z.string().optional(),
	age: z.number().optional(),
});

export const profileValidation = { createProfile };
