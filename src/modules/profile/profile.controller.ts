import { Request, Response } from "express";
import { handleAsync } from "../../lib/handleAsync";
import { userServices } from "../user/user.services";
import { sendResponse } from "../../lib/sendResponse";
import { profileServices } from "./profile.services";

//get-user profile according to token
const getUserProfile = handleAsync(async (req: Request, res: Response) => {
	const { userId } = req.params;
	const result = await profileServices.getUserProfile(userId);

	sendResponse(res, {
		statusCode: 200,
		message: "User profile retrieved successfully",
		data: result,
	});
});

//update profile
const updateProfile = handleAsync(async (req: Request, res: Response) => {
	const { userId } = req.params;

	const result = await profileServices.updateProfile(userId, req.body);

	sendResponse(res, {
		statusCode: 200,
		message: "User profile updated successfully",
		data: result,
	});
});

export const profileController = {
	getUserProfile,
	updateProfile,
};
