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
exports.userController = void 0;
const handleAsync_1 = require("../../lib/handleAsync");
const user_services_1 = require("./user.services");
const sendResponse_1 = require("../../lib/sendResponse");
//get all user
const getUser = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.userServices.getUser();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Users fetched successfully",
        data: result,
    });
}));
//SINGLE USER
const singleUser = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_services_1.userServices.singleUser(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "User fetched successfully",
        data: result,
    });
}));
//upload image
const updateUser = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_services_1.userServices.updateUser(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "User updated successfully",
        data: result,
    });
}));
exports.userController = { getUser, singleUser, updateUser };
