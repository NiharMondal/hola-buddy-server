import { Response } from "express";
type TMeta = {
	page: number;
	totalPages: number;
	limit: number;
};
export const sendResponse = <T>(
	res: Response,
	param: { statusCode: number; message: string; meta?: TMeta; data: T }
) => {
	res.status(param.statusCode).json({
		success: true,
		statusCode: param.statusCode,
		message: param.message,
		meta: param.meta,
		data: param.data,
	});
};
