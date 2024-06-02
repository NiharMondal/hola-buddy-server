import { User } from "@prisma/client";
import config from "../../config";
import prisma from "../../lib/prisma";
import CustomError from "../../utils/CustomError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (payload: User) => {
	const existingUser = await prisma.user.findUnique({
		where: {
			email: payload.email,
		},
	});

	if (existingUser) {
		throw new CustomError(302, "Sorry, Email is already used");
	}
	const hashedPassword = await bcrypt.hash(
		payload.password,
		Number(config.salt_round)
	);

	const createdUser = await prisma.user.create({
		data: {
			...payload,
			password: hashedPassword,
		},
		select: {
			id: true,
			email: true,
			name: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	return createdUser;
};

const login = async (payload: { email: string; password: string }) => {
	const user = await prisma.user.findUnique({
		where: {
			email: payload.email,
		},
	});

	if (!user) {
		throw new CustomError(404, "Sorry, User not found");
	}

	const isCorrectPass = await bcrypt.compare(payload.password, user.password);

	if (!isCorrectPass) {
		throw new CustomError(404, "Invalid credentials");
	}

	const accessToken = jwt.sign(
		{
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
		},
		config.jwt.jwt_secret as string,
		{
			expiresIn: config.jwt.expires_in,
		}
	);

	return {
		name: user.name,
		email: user.email,
		token: accessToken,
	};
};

const changePassword = async (
	id: string,
	payload: { oldPassword: string; newPassword: string; conPassword: string }
) => {
	if (payload.conPassword !== payload.newPassword) {
		throw new CustomError(400, "Confirm password didn't match");
	}
	if (payload.oldPassword === payload.newPassword) {
		throw new CustomError(400, "New password can't be current password!");
	}

	const user = await prisma.user.findUniqueOrThrow({
		where: {
			id: id,
		},
	});

	const matchPassword = await bcrypt.compare(
		payload.oldPassword,
		user.password
	);

	if (!matchPassword) {
		throw new CustomError(400, "Your current password doesn't match");
	}

	const hashedPass = await bcrypt.hash(
		payload.newPassword,
		Number(config.salt_round)
	);

	await prisma.user.update({
		where: {
			id,
		},
		data: {
			password: hashedPass,
		},
	});
};

export const authServices = { registerUser, login, changePassword };
