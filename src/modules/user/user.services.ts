import prisma from "../../lib/prisma";
import CustomError from "../../utils/CustomError";
type TUserWithProfile = {
	name: string;
	email: string;
};

const getUser = async () => {
	const result = await prisma.user.findMany({
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
		},
	});

	return result;
};

const singleUser = async (id: string) => {
	const result = await prisma.user.findUnique({
		where: { id },
		select: {
			email: true,
			avatar: true,
			name: true,
		},
	});

	return result;
};

const updateUser = async (id: string, payload: Partial<TUserWithProfile>) => {
	await prisma.user.findUniqueOrThrow({ where: { id } });

	if (payload.email) {
		const matchByEmail = await prisma.user.findFirst({
			where: { email: payload.email },
		});

		if (matchByEmail) {
			throw new CustomError(400, "This email address is already used!");
		}
	}
	const user = await prisma.user.update({
		where: { id },
		data: payload,
	});

	return user;
};

//only admin can update role
const updateRole = async (
	id: string,
	payload: { payload: { role: string } }
) => {
	await prisma.user.update({
		where: {
			id,
		},
		data: payload,
	});
};

export const userServices = {
	getUser,
	singleUser,
	updateUser,
	updateRole,
};
