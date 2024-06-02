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
exports.buddyController = void 0;
const handleAsync_1 = require("../../lib/handleAsync");
const sendResponse_1 = require("../../lib/sendResponse");
const buddyRequest_services_1 = require("./buddyRequest.services");
//create buddyRequest
const createBuddyRequest = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield buddyRequest_services_1.buddyRequestServices.createBuddyRequest(req.body, req.params.tripId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Travel buddy request sent successfully",
        data: result,
    });
}));
//get all buddyRequest
const getBuddyRequest = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield buddyRequest_services_1.buddyRequestServices.getAllBuddiesForSingletrip(req.params.tripId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Potential travel buddies retrieved successfully",
        data: result,
    });
}));
//update buddy request
const updateBuddyRequest = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { buddyId } = req.params;
    const result = yield buddyRequest_services_1.buddyRequestServices.updateBuddyRequest(req.body, buddyId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Travel buddy request responded successfully",
        data: result,
    });
}));
exports.buddyController = { createBuddyRequest, getBuddyRequest, updateBuddyRequest };
