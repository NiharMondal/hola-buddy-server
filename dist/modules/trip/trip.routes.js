"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripRoutes = void 0;
const express_1 = require("express");
const trip_controller_1 = require("./trip.controller");
const checkAuth_1 = __importDefault(require("../../middleware/checkAuth"));
const validateRequest_1 = require("../../middleware/validateRequest");
const trip_validation_1 = require("./trip.validation");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router
    .route("/")
    .post((0, checkAuth_1.default)(client_1.UserRole.admin, client_1.UserRole.user, client_1.UserRole.super_admin), (0, validateRequest_1.validateRequest)(trip_validation_1.tripValidation.createTrip), trip_controller_1.tripController.createTrip)
    .get(trip_controller_1.tripController.getAllTrips);
router.get("/my-trips", (0, checkAuth_1.default)(client_1.UserRole.user), trip_controller_1.tripController.loggedInUserTrip);
router.get("/show-case", trip_controller_1.tripController.showCaseTrip);
router
    .route("/:id")
    .get(trip_controller_1.tripController.singleTrip)
    .patch((0, checkAuth_1.default)(client_1.UserRole.admin, client_1.UserRole.user), trip_controller_1.tripController.updateTrip)
    .delete((0, checkAuth_1.default)(client_1.UserRole.admin, client_1.UserRole.user, client_1.UserRole.super_admin), trip_controller_1.tripController.deleteTrip);
exports.tripRoutes = router;
