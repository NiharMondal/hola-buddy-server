import { Router } from "express";

import checkAuth from "../../middleware/checkAuth";
import { buddyController } from "./buddyRequest.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { buddyValidation } from "./buddy.validation";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
	"/:tripId/request",
	checkAuth(UserRole.user),
	buddyController.createBuddyRequest
);

router.get(
	"/travel-buddies/:tripId",
	checkAuth(UserRole.user),
	buddyController.getAllBuddiesForSingletrip
);

router.patch(
	"/respond/:id",
	checkAuth(UserRole.user),
	validateRequest(buddyValidation.buddyRequest),
	buddyController.updateBuddyRequest
);

router.get(
	"/outgoing/:buddyId",
	checkAuth(UserRole.user),
	buddyController.getOutgoingRequest
);

router.get(
	"/incomming/:userId",
	checkAuth(UserRole.user),
	buddyController.getIncommingRequest
);

export const buddyRoutes = router;
