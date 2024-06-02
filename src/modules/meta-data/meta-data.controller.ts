import { Request, Response } from "express";
import { handleAsync } from "../../lib/handleAsync";

import { sendResponse } from "../../lib/sendResponse";
import { metaDataServices } from "./meta-data.services";

const metaData = handleAsync(async (req: Request, res: Response) => {
	const result = await metaDataServices.metaData();

	sendResponse(res, {
		statusCode: 200,
		message: "Meta data fetched successfully",
		data: result,
	});
});

export const metaDataController = { metaData };
