"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = __importDefault(require("../../middleware/checkAuth"));
const profile_controller_1 = require("./profile.controller");
const router = (0, express_1.Router)();
router
    .route("/")
    .get((0, checkAuth_1.default)(), profile_controller_1.profileController.getUserProfile)
    .put((0, checkAuth_1.default)(), profile_controller_1.profileController.updateProfile);
exports.profileRoutes = router;
