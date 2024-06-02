import { Request, Response } from "express";
import { handleAsync } from "../../lib/handleAsync";

import { sendResponse } from "../../lib/sendResponse";
import { buddyRequestServices } from "./buddyRequest.services";

//create buddyRequest
const createBuddyRequest = handleAsync(async (req: Request, res: Response) => {
	const result = await buddyRequestServices.createBuddyRequest(
		req.body,
		req.params.tripId
	);

	sendResponse(res, {
		statusCode: 201,
		message: "Travel buddy request sent successfully",
		data: result,
	});
});

//get all buddyRequest
const getAllBuddiesForSingletrip = handleAsync(
	async (req: Request, res: Response) => {
		const result = await buddyRequestServices.getAllBuddiesForSingletrip(
			req.params.tripId
		);

		sendResponse(res, {
			statusCode: 200,
			message: "Potential travel buddies retrieved successfully",
			data: result,
		});
	}
);

//update buddy request
const updateBuddyRequest = handleAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await buddyRequestServices.updateBuddyRequest(req.body, id);

	sendResponse(res, {
		statusCode: 200,
		message: "Travel buddy request updated successfully",
		data: result,
	});
});
const getOutgoingRequest = handleAsync(async (req: Request, res: Response) => {
	const { buddyId } = req.params;
	const result = await buddyRequestServices.getOutgoingRequest(buddyId);

	sendResponse(res, {
		statusCode: 200,
		message: "Your outgoing requests retrieved successfully",
		data: result,
	});
});
const getIncommingRequest = handleAsync(async (req: Request, res: Response) => {
	const { userId } = req.params;
	const result = await buddyRequestServices.getIncommingRequest(userId);

	sendResponse(res, {
		statusCode: 200,
		message: "Your incomming requests retrieved successfully",
		data: result,
	});
});
export const buddyController = {
	createBuddyRequest,
	getAllBuddiesForSingletrip,
	updateBuddyRequest,
	getOutgoingRequest,
	getIncommingRequest,
};
