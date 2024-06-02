import { RequestStatus } from "@prisma/client";
import prisma from "../../lib/prisma";
import CustomError from "../../utils/CustomError";

const createBuddyRequest = async (
	payload: { userId: string },
	tripId: string
) => {
	const result = await prisma.buddyRequest.create({
		data: {
			tripId,
			userId: payload.userId,
		},
	});
	return result;
};

const getAllBuddiesForSingletrip = async (tripId: string) => {
	const result = await prisma.buddyRequest.findMany({
		where: {
			tripId: tripId,
		},
		include: {
			user: {
				select: {
					id: true,
					name: true,
					email: true,
				},
			},
		},
	});

	return result;
};

//update status

const updateBuddyRequest = async (
	payload: { status: RequestStatus; tripId: string },
	id: string
) => {
	//at first find buddyrequest exists or not

	const exsitingBuddy = await prisma.buddyRequest.findUnique({
		where: {
			id,
			tripId: payload.tripId,
		},
	});
	if (!exsitingBuddy) {
		throw new CustomError(
			404,
			"Your requested buddyId and tripId doesn't match"
		);
	}
	const result = await prisma.buddyRequest.updateMany({
		where: {
			id,
			tripId: payload.tripId,
		},
		data: {
			status: payload.status,
		},
	});

	return result;
};

const getOutgoingRequest = async (userId: string) => {
	const result = await prisma.buddyRequest.findMany({
		where: {
			userId,
		},
		select: {
			status: true,
			trips: {
				select: {
					destination: true,
					budget: true,
					user: {
						select: {
							name: true,
						},
					},
				},
			},
		},
	});

	return result;
};

const getIncommingRequest = async (userId: string) => {
	const result = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			trip: {
				select: {
					id: true,
					title: true,
					budget: true,
					destination: true,
					buddyRequest: {
						select: {
							id: true,
							status: true,
							tripId: true,
							user: {
								select: {
									name: true,
									email: true,
								},
							},
						},
					},
				},
			},
		},
	});
	return result;
};
export const buddyRequestServices = {
	createBuddyRequest,
	getAllBuddiesForSingletrip,
	updateBuddyRequest,
	getOutgoingRequest,
	getIncommingRequest,
};
