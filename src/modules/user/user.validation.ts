import { z } from "zod";

const registerUser = z.object({
	name: z
		.string({ required_error: "Name is required" })
		.min(5, { message: "Name must be 5 characters logn!" }),
	password: z
		.string({ required_error: "Password is required" })
		.min(5, { message: "Pasword must be 6 characters" }),
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Please Provide a valid email" }),
});



export const userValidation = { registerUser };
