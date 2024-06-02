import prisma from "../../lib/prisma";

const metaData = async () => {
	const userCount = await prisma.user.count();
	const tripCount = await prisma.trip.count();

	const buddyRequestCount = await prisma.buddyRequest.count();

	return [
		{ count: userCount, name: "User Count" },
		{ count: tripCount, name: "Trip Count" },
		{ count: buddyRequestCount, name: "Buddy Request Count" },
	];
};

export const metaDataServices = { metaData };
