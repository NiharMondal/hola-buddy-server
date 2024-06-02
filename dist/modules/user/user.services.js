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
exports.userServices = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const CustomError_1 = __importDefault(require("../../utils/CustomError"));
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //check
    const existedUser = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (existedUser) {
        throw new CustomError_1.default(302, "Sorry, Email is already used");
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 12);
    //making user data
    const userData = {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
    };
    //using transaction
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield tx.user.create({
            data: Object.assign({}, userData),
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        yield tx.profile.create({
            data: Object.assign(Object.assign({}, payload.profile), { userId: createdUser.id }),
        });
        return createdUser;
    }));
    return result;
});
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany();
    return result;
});
exports.userServices = {
    registerUser,
    getUser,
};
