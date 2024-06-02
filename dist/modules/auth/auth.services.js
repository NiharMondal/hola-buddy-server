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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const config_1 = __importDefault(require("../../config"));
const prisma_1 = __importDefault(require("../../lib/prisma"));
const CustomError_1 = __importDefault(require("../../utils/CustomError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (!user) {
        throw new CustomError_1.default(404, "Sorry, User not found");
    }
    const isCorrectPass = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isCorrectPass) {
        throw new CustomError_1.default(404, "Invalid credentials");
    }
    const accessToken = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        name: user.name,
    }, config_1.default.jwt.jwt_secret, {
        expiresIn: config_1.default.jwt.expires_in,
    });
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: accessToken,
    };
});
exports.authServices = { login };
