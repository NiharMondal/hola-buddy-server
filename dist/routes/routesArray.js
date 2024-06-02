"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerArray = void 0;
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const trip_routes_1 = require("../modules/trip/trip.routes");
const buddyRequest_routes_1 = require("../modules/buddyRequest/buddyRequest.routes");
const profile_routes_1 = require("../modules/profile/profile.routes");
const meta_data_routes_1 = require("../modules/meta-data/meta-data.routes");
exports.routerArray = [
    {
        path: "/user",
        routes: user_routes_1.userRoutes,
    },
    {
        path: "/auth",
        routes: auth_routes_1.authRoutes,
    },
    {
        path: "/trips",
        routes: trip_routes_1.tripRoutes,
    },
    {
        path: "/buddy",
        routes: buddyRequest_routes_1.buddyRoutes,
    },
    {
        path: "/profile",
        routes: profile_routes_1.profileRoutes,
    },
    {
        path: "/meta-data",
        routes: meta_data_routes_1.metaRoutes,
    },
];
