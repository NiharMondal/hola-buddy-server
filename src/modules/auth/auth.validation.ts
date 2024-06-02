import { z } from "zod";

const login = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "You must provide a valid email" }),
	password: z.string({ required_error: "Password is required" }),
});
const changePassword = z.object({
	oldPassword: z.string({ required_error: "Old password is required" }),
	newPassword: z.string({ required_error: "New password is required" }),
	conPassword: z.string({ required_error: "Confirm password is required" }),
});

export const authValidation = { login, changePassword };
