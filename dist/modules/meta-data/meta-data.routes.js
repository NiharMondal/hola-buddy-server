"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaRoutes = void 0;
const express_1 = require("express");
const meta_data_controller_1 = require("./meta-data.controller");
const checkAuth_1 = __importDefault(require("../../middleware/checkAuth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get("/", (0, checkAuth_1.default)(client_1.UserRole.admin, client_1.UserRole.super_admin), meta_data_controller_1.metaDataController.metaData);
exports.metaRoutes = router;
