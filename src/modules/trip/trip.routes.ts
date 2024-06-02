import { Router } from "express";
import { tripController } from "./trip.controller";
import checkAuth from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { tripValidation } from "./trip.validation";
import { UserRole } from "@prisma/client";

const router = Router();
router
	.route("/")
	.post(
		checkAuth(UserRole.admin, UserRole.user, UserRole.super_admin),
		validateRequest(tripValidation.createTrip),
		tripController.createTrip
	)
	.get(tripController.getAllTrips);

router.get(
	"/my-trips",
	checkAuth(UserRole.user),
	tripController.loggedInUserTrip
);
router.get(
	"/show-case",

	tripController.showCaseTrip
);

router
	.route("/:id")
	.get(tripController.singleTrip)
	.patch(checkAuth(UserRole.admin, UserRole.user), tripController.updateTrip)
	.delete(
		checkAuth(UserRole.admin, UserRole.user, UserRole.super_admin),
		tripController.deleteTrip
	);

export const tripRoutes = router;
