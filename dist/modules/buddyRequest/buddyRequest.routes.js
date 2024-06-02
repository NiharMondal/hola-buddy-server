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
const router = (0, express_1.Router)();
router.post("/trip/:tripId/request", (0, checkAuth_1.default)(), buddyRequest_controller_1.buddyController.createBuddyRequest);
router.get("/travel-buddies/:tripId", (0, checkAuth_1.default)(), buddyRequest_controller_1.buddyController.getBuddyRequest);
router.put("/travel-buddies/:buddyId/respond", (0, checkAuth_1.default)(), (0, validateRequest_1.validateRequest)(buddy_validation_1.buddyValidation.buddyRequest), buddyRequest_controller_1.buddyController.updateBuddyRequest);
exports.buddyRoutes = router;
