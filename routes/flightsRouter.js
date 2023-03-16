import { Router } from "express";
import flightsController from "../controllers/flightsController.js";

const flightsRouter = Router();

flightsRouter.get("/get", flightsController.getAllFlights);

flightsRouter.get("/get/:flightId", flightsController.getFlightById);

flightsRouter.post("/add", flightsController.addFlight);

flightsRouter.put("/edit/:flightId", flightsController.editFlightById);

flightsRouter.delete("/delete/:flightId", flightsController.deleteFlightById);

export default flightsRouter;
