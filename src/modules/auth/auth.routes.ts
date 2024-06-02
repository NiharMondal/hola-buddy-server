import { Router } from "express";

import { authController } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { authValidation } from "./auth.validation";
import { userValidation } from "../user/user.validation";
import checkAuth from "../../middleware/checkAuth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
	"/login",
	validateRequest(authValidation.login),
	authController.login
);

router.post(
	"/register",

	validateRequest(userValidation.registerUser),
	authController.registerUser
);

router.post(
	"/change-password",
	validateRequest(authValidation.changePassword),
	checkAuth(UserRole.user, UserRole.admin, UserRole.super_admin),

	authController.changePassword
);

export const authRoutes = router;
