import express, { Application } from "express";
import cors from "cors";
import router from "./routes";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";

const app: Application = express();

app.use(
	cors({
		origin: [
			"https://assignment-9-front-end.vercel.app",
			"http://localhost:3000",
		],
		credentials: true,
	})
);
app.use(express.json());

//use routes
app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use("*", notFound);

export default app;
