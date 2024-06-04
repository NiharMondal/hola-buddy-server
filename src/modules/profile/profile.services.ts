import prisma from "../../lib/prisma";

//get user profile userId
const getUserProfile = async (userId: string) => {
	const userProfile = await prisma.profile.findUniqueOrThrow({
		where: {
			userId: userId,
		},
	});
	return userProfile;
};

//update profile
const updateProfile = async (
	userId: string,
	payload: { bio: string; country: string; age: number }
) => {
	const userProfile = await prisma.profile.upsert({
		where: {
			userId,
		},
		create: {
			userId,
			...payload,
		},
		update: payload,
	});
	return userProfile;
};
export const profileServices = {
	getUserProfile,
	updateProfile,
};
