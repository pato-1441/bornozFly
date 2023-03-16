import { Router } from "express";
import flightsController from "../controllers/flightsController.js";

const flightsRouter = Router();

flightsRouter.get("/", flightsController.getAllFlights);

export default flightsRouter;
