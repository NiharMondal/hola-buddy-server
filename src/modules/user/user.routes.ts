import { Router } from "express";
import { userController } from "./user.controller";
import checkAuth from "../../middleware/checkAuth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get(
	"/",
	checkAuth(UserRole.admin, UserRole.super_admin),
	userController.getUser
);
router.patch(
	"/role/:id",
	checkAuth(UserRole.admin, UserRole.super_admin),
	userController.updateRole
);

router
	.route("/:id")
	.get(
		checkAuth(UserRole.admin, UserRole.user, UserRole.super_admin),
		userController.singleUser
	)
	.patch(
		checkAuth(UserRole.user, UserRole.admin, UserRole.super_admin),
		userController.updateUser
	);

export const userRoutes = router;
