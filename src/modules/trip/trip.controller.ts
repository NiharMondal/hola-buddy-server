import { Request, Response } from "express";
import { handleAsync } from "../../lib/handleAsync";
import { tripServices } from "./trip.services";
import { sendResponse } from "../../lib/sendResponse";
import pick from "../../utils/pick";
import { tripFilterableFields } from "./trip.constant";

const createTrip = handleAsync(
	async (req: Request & { user?: any }, res: Response) => {
		const user = req.user;
		const result = await tripServices.createTrip(req.body, user);

		sendResponse(res, {
			statusCode: 201,
			message: "Trip created successfully",
			data: result,
		});
	}
);

//get all trip

const getAllTrips = handleAsync(async (req: Request, res: Response) => {
	const filters = pick(req.query, tripFilterableFields);
	const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

	const result = await tripServices.getAllTrips(filters, options);

	sendResponse(res, {
		statusCode: 200,
		message: "Trips retrieved successfully",
		meta: result.meta,
		data: result.data,
	});
});
const showCaseTrip = handleAsync(async (req: Request, res: Response) => {
	const result = await tripServices.showCaseTrip();

	sendResponse(res, {
		statusCode: 200,
		message: "Trips retrieved successfully",
		data: result,
	});
});

const loggedInUserTrip = handleAsync(
	async (req: Request & { user?: any }, res: Response) => {
		const user = req.user;
		const result = await tripServices.loggedInUserTrip(user.id);

		sendResponse(res, {
			statusCode: 200,
			message: "My trip retrived successfully",
			data: result,
		});
	}
);
const singleTrip = handleAsync(
	async (req: Request & { user?: any }, res: Response) => {
		const result = await tripServices.singleTrip(req.params.id);

		sendResponse(res, {
			statusCode: 200,
			message: "Trip retrived successfully",
			data: result,
		});
	}
);

const updateTrip = handleAsync(
	async (req: Request & { user?: any }, res: Response) => {
		const result = await tripServices.updateTrip(req.params.id, req.body);

		sendResponse(res, {
			statusCode: 200,
			message: "Trip updated successfully",
			data: result,
		});
	}
);

const deleteTrip = handleAsync(
	async (req: Request & { user?: any }, res: Response) => {
		const result = await tripServices.deleteTrip(req.params.id);

		sendResponse(res, {
			statusCode: 200,
			message: "Trip deleted successfully",
			data: result,
		});
	}
);
export const tripController = {
	createTrip,
	getAllTrips,
	singleTrip,
	updateTrip,
	deleteTrip,
	showCaseTrip,
	loggedInUserTrip,
};
