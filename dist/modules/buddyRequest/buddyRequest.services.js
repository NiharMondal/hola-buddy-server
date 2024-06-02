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
exports.buddyRequestServices = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const CustomError_1 = __importDefault(require("../../utils/CustomError"));
const createBuddyRequest = (payload, tripId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.buddyRequest.create({
        data: {
            tripId,
            userId: payload.userId,
        },
    });
    return result;
});
const getAllBuddiesForSingletrip = (tripId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.buddyRequest.findMany({
        where: {
            tripId: tripId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    return result;
});
//update status
const updateBuddyRequest = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    //at first find buddyrequest exists or not
    const exsitingBuddy = yield prisma_1.default.buddyRequest.findUnique({
        where: {
            id,
            tripId: payload.tripId,
        },
    });
    if (!exsitingBuddy) {
        throw new CustomError_1.default(404, "Your requested buddyId and tripId doesn't match");
    }
    const result = yield prisma_1.default.buddyRequest.updateMany({
        where: {
            id,
            tripId: payload.tripId,
        },
        data: {
            status: payload.status,
        },
    });
    return result;
});
const getOutgoingRequest = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.buddyRequest.findMany({
        where: {
            userId,
        },
        select: {
            status: true,
            trips: {
                select: {
                    destination: true,
                    budget: true,
                    user: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });
    return result;
});
const getIncommingRequest = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            trip: {
                select: {
                    id: true,
                    title: true,
                    budget: true,
                    destination: true,
                    buddyRequest: {
                        select: {
                            id: true,
                            status: true,
                            tripId: true,
                            user: {
                                select: {
                                    name: true,
                                    email: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    return result;
});
exports.buddyRequestServices = {
    createBuddyRequest,
    getAllBuddiesForSingletrip,
    updateBuddyRequest,
    getOutgoingRequest,
    getIncommingRequest,
};
