import { Request, Response } from "express";
import { handleAsync } from "../../lib/handleAsync";
import { authServices } from "./auth.services";
import { sendResponse } from "../../lib/sendResponse";

//create user
const registerUser = handleAsync(async (req: Request, res: Response) => {
	const result = await authServices.registerUser(req.body);

	sendResponse(res, {
		statusCode: 201,
		message: "User created successfully",
		data: result,
	});
});
const login = handleAsync(async (req: Request, res: Response) => {
	const result = await authServices.login(req.body);

	sendResponse(res, {
		statusCode: 200,
		message: "User logged in successfully",
		data: result,
	});
});

const changePassword = handleAsync(async (req: Request, res: Response) => {
	const user = req.user;
	const result = await authServices.changePassword(user.id, req.body);

	sendResponse(res, {
		statusCode: 200,
		message: "Password changed successfully",
		data: result,
	});
});

export const authController = { registerUser, login, changePassword };
