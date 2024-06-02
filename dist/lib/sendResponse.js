"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, param) => {
    res.status(param.statusCode).json({
        success: true,
        statusCode: param.statusCode,
        message: param.message,
        meta: param.meta,
        data: param.data,
    });
};
exports.sendResponse = sendResponse;
