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
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (existingUser) {
        throw new CustomError_1.default(302, "Sorry, Email is already used");
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.salt_round));
    const createdUser = yield prisma_1.default.user.create({
        data: Object.assign(Object.assign({}, payload), { password: hashedPassword }),
        select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return createdUser;
});
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
        role: user.role,
    }, config_1.default.jwt.jwt_secret, {
        expiresIn: config_1.default.jwt.expires_in,
    });
    return {
        name: user.name,
        email: user.email,
        token: accessToken,
    };
});
const changePassword = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.conPassword !== payload.newPassword) {
        throw new CustomError_1.default(400, "Confirm password didn't match");
    }
    if (payload.oldPassword === payload.newPassword) {
        throw new CustomError_1.default(400, "New password can't be current password!");
    }
    const user = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const matchPassword = yield bcrypt_1.default.compare(payload.oldPassword, user.password);
    if (!matchPassword) {
        throw new CustomError_1.default(400, "Your current password doesn't match");
    }
    const hashedPass = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.salt_round));
    yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: {
            password: hashedPass,
        },
    });
});
exports.authServices = { registerUser, login, changePassword };
