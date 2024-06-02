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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripServices = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const paginationHelpers_1 = require("../../utils/paginationHelpers");
const trip_constant_1 = require("./trip.constant");
const createTrip = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.trip.create({
        data: Object.assign(Object.assign({}, payload), { userId: user.id }),
    });
    return result;
});
const showCaseTrip = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.trip.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    avatar: true,
                },
            },
        },
        take: 3,
    });
    return result;
});
//get all trip
const getAllTrips = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelpers_1.paginationHelper.calculatePagination(options);
    const { search, budget } = filters, filterData = __rest(filters, ["search", "budget"]);
    const queryResult = [];
    if (search) {
        queryResult.push({
            OR: trip_constant_1.searchAbleKey.map((value) => ({
                [value]: {
                    contains: filters.search,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        queryResult.push({
            OR: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    if (budget) {
        const splitedValue = budget.split(",");
        queryResult.push({
            OR: [
                {
                    budget: {
                        gte: Number(splitedValue[0]),
                        lte: Number(splitedValue[1]),
                    },
                },
            ],
        });
    }
    const whereCondition = { AND: queryResult };
    const result = yield prisma_1.default.trip.findMany({
        where: whereCondition,
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                },
            },
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "desc",
            },
    });
    const total = yield prisma_1.default.trip.count({ where: whereCondition });
    const totalPages = Math.ceil(total / limit);
    return {
        meta: {
            page,
            limit,
            totalPages,
        },
        data: result,
    };
});
const loggedInUserTrip = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield prisma_1.default.trip.findMany({ where: { userId: id } });
    return trip;
});
const singleTrip = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.trip.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    name: true,
                    avatar: true,
                },
            },
        },
    });
    return result;
});
const updateTrip = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //checking trip exists  or not
    yield prisma_1.default.trip.findUniqueOrThrow({ where: { id } });
    //updating here
    const result = prisma_1.default.trip.update({
        where: { id },
        data: Object.assign({}, payload),
    });
    return result;
});
const deleteTrip = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.buddyRequest.deleteMany({
            where: {
                tripId: id,
            },
        });
        const result = tx.trip.delete({ where: { id } });
        return result;
    }));
    return res;
});
exports.tripServices = {
    createTrip,
    getAllTrips,
    singleTrip,
    updateTrip,
    deleteTrip,
    loggedInUserTrip,
    showCaseTrip,
};
