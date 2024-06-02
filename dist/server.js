"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
function main() {
    let server;
    server = app_1.default.listen(5000, () => {
        console.log("server is running on port 5000");
    });
    process.on("unhandledRejection", (err) => {
        console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
        if (server) {
            server.close(() => {
                process.exit(1);
            });
        }
        process.exit(1);
    });
    process.on("uncaughtException", () => {
        console.log(`👻 uncaughtException is detected , shutting down ...`);
        process.exit(1);
    });
}
main();
