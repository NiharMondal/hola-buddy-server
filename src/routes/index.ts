import { Router } from "express";
import { routerArray } from "./routesArray";

const router = Router();

routerArray.forEach((route) => router.use(route.path, route.routes));

export default router;
