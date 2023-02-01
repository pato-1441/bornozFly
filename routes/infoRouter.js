import { Router } from "express";
import { infoController } from "../controllers/index.js";
import compression from "compression";

const infoRouter = Router();

infoRouter.get("/", infoController.getInfo);

infoRouter.get("/clg", infoController.getInfoWithClg);

infoRouter.get("/zip", compression(), infoController.getInfoZip);

export default infoRouter;
