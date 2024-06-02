"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const checkAuth_1 = __importDefault(require("../../middleware/checkAuth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get("/", (0, checkAuth_1.default)(client_1.UserRole.admin, client_1.UserRole.super_admin), user_controller_1.userController.getUser);
router
    .route("/:id")
    .get((0, checkAuth_1.default)(client_1.UserRole.admin, client_1.UserRole.user, client_1.UserRole.super_admin), user_controller_1.userController.singleUser)
    .patch((0, checkAuth_1.default)(client_1.UserRole.user, client_1.UserRole.admin, client_1.UserRole.super_admin), user_controller_1.userController.updateUser);
exports.userRoutes = router;
