"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routesArray_1 = require("./routesArray");
const router = (0, express_1.Router)();
routesArray_1.routerArray.forEach((route) => router.use(route.path, route.routes));
exports.default = router;
