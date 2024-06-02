import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";

type TErrorSources = {
	field: string | number;
	message: string;
};
type TErrorResponse<T> = {
	statusCode: number;
	message: string;
	errorDetails: T | TErrorSources[];
};

export const globalErrorHandler = <T>(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errorResponse: TErrorResponse<T> = {
		statusCode: err.statusCode,
		message: err.message || "Something went wrong",
		errorDetails: err,
	};
	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		if (err.code === "P2002") {
			errorResponse.statusCode = 400;
			errorResponse.message = `Unique validation error`;
		}
	}

	if (err instanceof ZodError) {
		errorResponse.statusCode = 400;
		errorResponse.message = err.issues
			.map((errObj) => errObj.message)
			.toString();
		errorResponse.errorDetails = err.issues.map((error: ZodIssue) => {
			return {
				field: error.path[0],
				message: error.message,
			};
		});
	} else {
		errorResponse.statusCode = err.statusCode || 500;
		errorResponse.message = err.message;
		errorResponse.errorDetails = err;
	}

	res.status(errorResponse.statusCode).json({
		success: false,
		message: errorResponse.message,
		errorDetails: errorResponse.errorDetails,
	});
};
