import { Router } from "express";

import checkAuth from "../../middleware/checkAuth";
import { profileController } from "./profile.controller";
import { UserRole } from "@prisma/client";
import { validateRequest } from "../../middleware/validateRequest";
import { profileValidation } from "./profile.validation";

const router = Router();

// router
// 	.route("/")
// 	.get(
// 		checkAuth(UserRole.admin, UserRole.super_admin),
// 		profileController.getUserProfile
// 	);
router
	.route("/:userId")
	.get(
		checkAuth(UserRole.admin, UserRole.user, UserRole.super_admin),
		profileController.getUserProfile
	)
	.patch(
		validateRequest(profileValidation.createProfile),
		checkAuth(UserRole.admin, UserRole.user, UserRole.super_admin),
		profileController.updateProfile
	);

export const profileRoutes = router;
