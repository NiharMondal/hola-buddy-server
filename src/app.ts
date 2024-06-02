import express, { Application } from "express";
import cors from "cors";
import router from "./routes";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";

const app: Application = express();

const corsOptions = {
	origin: "https://assignment-9-front-end.vercel.app",
	credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use routes
app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use("*", notFound);

export default app;
