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
exports.authController = void 0;
const handleAsync_1 = require("../../lib/handleAsync");
const auth_services_1 = require("./auth.services");
const sendResponse_1 = require("../../lib/sendResponse");
//create user
const registerUser = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.authServices.registerUser(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "User created successfully",
        data: result,
    });
}));
const login = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.authServices.login(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "User logged in successfully",
        data: result,
    });
}));
const changePassword = (0, handleAsync_1.handleAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield auth_services_1.authServices.changePassword(user.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Password changed successfully",
        data: result,
    });
}));
exports.authController = { registerUser, login, changePassword };
