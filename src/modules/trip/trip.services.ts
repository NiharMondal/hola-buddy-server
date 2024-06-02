import { Prisma, Trip } from "@prisma/client";
import prisma from "../../lib/prisma";
import { JwtPayload } from "jsonwebtoken";
import {
	TPaginationOptions,
	paginationHelper,
} from "../../utils/paginationHelpers";
import { searchAbleKey } from "./trip.constant";

export interface ITripFilterRequest {
	search?: string | undefined;
	destination?: string | undefined;
	startDate?: string | undefined;
	endDate?: string | undefined;
	budget?: string | undefined;
}

const createTrip = async (payload: Trip, user: JwtPayload) => {
	const result = await prisma.trip.create({
		data: {
			...payload,
			userId: user.id,
		},
	});

	return result;
};
const showCaseTrip = async () => {
	const result = await prisma.trip.findMany({
		include: {
			user: {
				select: {
					name: true,
					email: true,
					avatar: true,
				},
			},
		},
		take: 3,
	});

	return result;
};

//get all trip
const getAllTrips = async (
	filters: ITripFilterRequest,
	options: TPaginationOptions
) => {
	const { page, limit, skip } = paginationHelper.calculatePagination(options);
	const { search, budget, ...filterData } = filters;

	const queryResult: Prisma.TripWhereInput[] = [];

	if (search) {
		queryResult.push({
			OR: searchAbleKey.map((value) => ({
				[value]: {
					contains: filters.search,
					mode: "insensitive",
				},
			})),
		});
	}
	if (Object.keys(filterData).length > 0) {
		queryResult.push({
			OR: Object.keys(filterData).map((key) => ({
				[key]: {
					equals: (filterData as any)[key],
				},
			})),
		});
	}

	if (budget) {
		const splitedValue = budget.split(",");

		queryResult.push({
			OR: [
				{
					budget: {
						gte: Number(splitedValue[0]),
						lte: Number(splitedValue[1]),
					},
				},
			],
		});
	}

	const whereCondition: Prisma.TripWhereInput = { AND: queryResult };

	const result = await prisma.trip.findMany({
		where: whereCondition,
		include: {
			user: {
				select: {
					name: true,
					email: true,
				},
			},
		},
		skip,
		take: limit,
		orderBy:
			options.sortBy && options.sortOrder
				? {
						[options.sortBy]: options.sortOrder,
				  }
				: {
						createdAt: "desc",
				  },
	});
	const total = await prisma.trip.count({ where: whereCondition });
	const totalPages = Math.ceil(total / limit);

	return {
		meta: {
			page,
			limit,
			totalPages,
		},

		data: result,
	};
};

const loggedInUserTrip = async (id: string) => {
	const trip = await prisma.trip.findMany({ where: { userId: id } });

	return trip;
};

const singleTrip = async (id: string) => {
	const result = prisma.trip.findUnique({
		where: { id },
		include: {
			user: {
				select: {
					name: true,
					avatar: true,
				},
			},
		},
	});
	return result;
};

const updateTrip = async (id: string, payload: Trip) => {
	//checking trip exists  or not
	await prisma.trip.findUniqueOrThrow({ where: { id } });

	//updating here
	const result = prisma.trip.update({
		where: { id },
		data: {
			...payload,
		},
	});
	return result;
};
const deleteTrip = async (id: string) => {
	const res = await prisma.$transaction(async (tx) => {
		await tx.buddyRequest.deleteMany({
			where: {
				tripId: id,
			},
		});
		const result = tx.trip.delete({ where: { id } });
		return result;
	});
	return res;
};
export const tripServices = {
	createTrip,
	getAllTrips,
	singleTrip,
	updateTrip,
	deleteTrip,
	loggedInUserTrip,
	showCaseTrip,
};
