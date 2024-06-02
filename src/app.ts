import express, { Application } from "express";
import cors from "cors";
import router from "./routes";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";

const app: Application = express();

app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use routes
app.use("/api/v1", router);

app.use(globalErrorHandler);
app.use("*", notFound);

export default app;
