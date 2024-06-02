"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileController = void 0;
const handleAsync_1 = require("../../lib/handleAsync");
const sendResponse_1 = require("../../lib/sendResponse");
const profile_services_1 = require("./profile.services");
//get-user profile according to token
const getUserProfile = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield profile_services_1.profileServices.getUserProfile(user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "User profile retrieved successfully",
        data: result,
    });
}));
//update profile
const updateProfile = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield profile_services_1.profileServices.updateProfile(user, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "User profile updated successfully",
        data: result,
    });
}));
exports.profileController = {
    getUserProfile, updateProfile
};
