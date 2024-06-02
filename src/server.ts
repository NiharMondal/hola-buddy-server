import { Server } from "http";
import app from "./app";

function main() {
	let server: Server;

	server = app.listen(5000, () => {
		console.log("server is running on port 5000");
	});

	process.on("unhandledRejection", (err) => {
		console.log(
			`😈 unahandledRejection is detected , shutting down ...`,
			err
		);
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
