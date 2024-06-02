"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const trip_routes_1 = require("../modules/trip/trip.routes");
const buddyRequest_routes_1 = require("../modules/buddyRequest/buddyRequest.routes");
const profile_routes_1 = require("../modules/profile/profile.routes");
const routerArray = [
    {
        path: "/",
        routes: user_routes_1.userRoutes,
    },
    {
        path: "/login",
        routes: auth_routes_1.authRoutes,
    },
    {
        path: "/trips",
        routes: trip_routes_1.tripRoutes,
    },
    {
        path: "/",
        routes: buddyRequest_routes_1.buddyRoutes,
    },
    {
        path: "/profile",
        routes: profile_routes_1.profileRoutes,
    },
];
const router = (0, express_1.Router)();
routerArray.forEach((route) => router.use(route.path, route.routes));
exports.default = router;
