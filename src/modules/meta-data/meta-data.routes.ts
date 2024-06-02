import { Router } from "express";
import { metaDataController } from "./meta-data.controller";
import checkAuth from "../../middleware/checkAuth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get(
	"/",
	checkAuth(UserRole.admin, UserRole.super_admin),
	metaDataController.metaData
);

export const metaRoutes = router;
