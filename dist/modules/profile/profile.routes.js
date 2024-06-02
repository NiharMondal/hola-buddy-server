"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = __importDefault(require("../../middleware/checkAuth"));
const profile_controller_1 = require("./profile.controller");
const client_1 = require("@prisma/client");
const validateRequest_1 = require("../../middleware/validateRequest");
const profile_validation_1 = require("./profile.validation");
const router = (0, express_1.Router)();
// router
// 	.route("/")
// 	.get(
// 		checkAuth(UserRole.admin, UserRole.super_admin),
// 		profileController.getUserProfile
// 	);
router
    .route("/:userId")
    .get((0, checkAuth_1.default)(client_1.UserRole.admin, client_1.UserRole.user, client_1.UserRole.super_admin), profile_controller_1.profileController.getUserProfile)
    .patch((0, validateRequest_1.validateRequest)(profile_validation_1.profileValidation.createProfile), (0, checkAuth_1.default)(client_1.UserRole.admin, client_1.UserRole.user, client_1.UserRole.super_admin), profile_controller_1.profileController.updateProfile);
exports.profileRoutes = router;
