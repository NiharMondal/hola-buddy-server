import { z } from "zod";

const createTrip = z.object({
	title: z.string({ required_error: "Title is required" }),
	destination: z.string({ required_error: "Destination is required" }),
	startDate: z.string({ required_error: "Start date is required" }),
	endDate: z.string({ required_error: "End date is required" }),
	description: z.string({ required_error: "Description is required" }),
	budget: z
		.number({ required_error: "Budget is required" })
		.positive({ message: "Budget must be positive" })
		.max(500000, { message: "Budget must be lest than 500000" }),
	photo: z.string().optional(),
});

export const tripValidation = { createTrip };
