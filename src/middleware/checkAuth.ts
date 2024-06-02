import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/CustomError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import prisma from "../lib/prisma";

const checkAuth = (...roles: string[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const token = req.headers.authorization;

			if (!token) {
				throw new CustomError(401, "You are not authorized");
			}

			const decoded = jwt.verify(
				token,
				config.jwt.jwt_secret as string
			) as JwtPayload;
			const { id, role } = decoded;
			const user = await prisma.user.findUnique({
				where: {
					id: id,
				},
			});
			if (!user) {
				throw new CustomError(401, "This user is not found!");
			}

			if (token && !roles.includes(role)) {
				throw new CustomError(401, "You are not authorized");
			}

			req.user = decoded as JwtPayload;

			next();
		} catch (error) {
			next(error);
		}
	};
};
export default checkAuth;
