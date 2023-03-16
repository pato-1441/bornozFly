import logger from "../helpers/logger.js";
import { Flight } from "../models/index.js";

const getAllFlights = async (req, res) => {
  try {
    res.send({ operationStatus: "successful", flights: Flight.find() });
  } catch (error) {
    logger.error(error);
    res.send(error);
  }
};

const addFlight = async (req, res) => {
  const { flight } = req.body;
  try {
    const flightAdded = await Flight.insertMany(flight);
    res.send({ operationStatus: "successful", flightAdded: flightAdded });
  } catch (error) {
    logger.error(error);
    res.send(error);
  }
};

const editFlightById = async (req, res) => {
  const { flightId } = req.params;
  const { flight } = req.body;
  console.log(flightId);
  console.log(flight);
  try {
    const flightModified = await Flight.findByIdAndUpdate(flightId, flight);
    res.send({ operationStatus: "successful", flightModified: flightModified });
  } catch (error) {
    logger.error(error);
    res.send(error);
  }
};

export default {
  getAllFlights,
  addFlight,
  editFlightById
};
