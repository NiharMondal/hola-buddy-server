"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const auth_validation_1 = require("./auth.validation");
const user_validation_1 = require("../user/user.validation");
const checkAuth_1 = __importDefault(require("../../middleware/checkAuth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post("/login", (0, validateRequest_1.validateRequest)(auth_validation_1.authValidation.login), auth_controller_1.authController.login);
router.post("/register", (0, validateRequest_1.validateRequest)(user_validation_1.userValidation.registerUser), auth_controller_1.authController.registerUser);
router.post("/change-password", (0, validateRequest_1.validateRequest)(auth_validation_1.authValidation.changePassword), (0, checkAuth_1.default)(client_1.UserRole.user, client_1.UserRole.admin, client_1.UserRole.super_admin), auth_controller_1.authController.changePassword);
exports.authRoutes = router;
