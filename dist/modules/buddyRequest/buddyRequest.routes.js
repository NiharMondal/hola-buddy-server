"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buddyRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = __importDefault(require("../../middleware/checkAuth"));
const buddyRequest_controller_1 = require("./buddyRequest.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const buddy_validation_1 = require("./buddy.validation");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post("/:tripId/request", (0, checkAuth_1.default)(client_1.UserRole.user), buddyRequest_controller_1.buddyController.createBuddyRequest);
router.get("/travel-buddies/:tripId", (0, checkAuth_1.default)(client_1.UserRole.user), buddyRequest_controller_1.buddyController.getAllBuddiesForSingletrip);
router.patch("/respond/:id", (0, checkAuth_1.default)(client_1.UserRole.user), (0, validateRequest_1.validateRequest)(buddy_validation_1.buddyValidation.buddyRequest), buddyRequest_controller_1.buddyController.updateBuddyRequest);
router.get("/outgoing/:buddyId", (0, checkAuth_1.default)(client_1.UserRole.user), buddyRequest_controller_1.buddyController.getOutgoingRequest);
router.get("/incomming/:userId", (0, checkAuth_1.default)(client_1.UserRole.user), buddyRequest_controller_1.buddyController.getIncommingRequest);
exports.buddyRoutes = router;
