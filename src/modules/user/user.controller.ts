import { Request, Response } from "express";
import { handleAsync } from "../../lib/handleAsync";
import { userServices } from "./user.services";
import { sendResponse } from "../../lib/sendResponse";

//get all user
const getUser = handleAsync(async (req: Request, res: Response) => {
	const result = await userServices.getUser();

	sendResponse(res, {
		statusCode: 200,
		message: "Users fetched successfully",
		data: result,
	});
});

//SINGLE USER
const singleUser = handleAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await userServices.singleUser(id);

	sendResponse(res, {
		statusCode: 200,
		message: "User fetched successfully",
		data: result,
	});
});

//upload image
const updateUser = handleAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await userServices.updateUser(id, req.body);

	sendResponse(res, {
		statusCode: 200,
		message: "User updated successfully",
		data: result,
	});
});

//only admin can update user role
const updateRole = handleAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await userServices.updateRole(id, req.body);

	sendResponse(res, {
		statusCode: 200,
		message: "User role updated successfully",
		data: result,
	});
});

export const userController = { getUser, singleUser, updateUser, updateRole };
