"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const globalErrorHandler_1 = require("./middleware/globalErrorHandler");
const notFound_1 = require("./middleware/notFound");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "https://assignment-9-front-end.vercel.app",
        "http://localhost:3000",
    ],
    credentials: true,
}));
app.use(express_1.default.json());
//use routes
app.use("/api/v1", routes_1.default);
app.use(globalErrorHandler_1.globalErrorHandler);
app.use("*", notFound_1.notFound);
exports.default = app;
