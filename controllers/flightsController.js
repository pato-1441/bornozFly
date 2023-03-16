import logger from "../helpers/logger.js";
import { Flight } from "../models/index.js";

const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find()
    res.send({ operationStatus: "successful", flights: flights});
  } catch (error) {
    logger.error(error);
    res.send({ operationStatus: "error", error: error });
  }
};

const getFlightById = async (req, res) => {
  const { flightId } = req.params;
  try {
    const flight = await Flight.findById(flightId);
    res.send({ operationStatus: "successful", flight: flight });
  } catch (error) {
    logger.error(error);
    res.send({ operationStatus: "error", error: error });
  }
};

const addFlight = async (req, res) => {
  const { flight } = req.body;
  try {
    const flightAdded = await Flight.insertMany(flight);
    res.send({ operationStatus: "successful", flightAdded: flightAdded });
  } catch (error) {
    logger.error(error);
    res.send({ operationStatus: "error", error: error });
  }
};

const editFlightById = async (req, res) => {
  const { flightId } = req.params;
  const { flight } = req.body;
  try {
    const flightModified = await Flight.findByIdAndUpdate(flightId, flight);
    res.send({ operationStatus: "successful", flightModified: flightModified });
  } catch (error) {
    logger.error(error);
    res.send({ operationStatus: "error", error: error });
  }
};

const deleteFlightById = async (req, res) => {
  const { flightId } = req.params;
  try {
    const flightDeleted = await Flight.findByIdAndDelete(flightId);
    res.send({ operationStatus: "successful", flightDeleted: flightDeleted });
  } catch (error) {
    logger.error(error);
    res.send({ operationStatus: "error", error: error });
  }
};

export default {
  getAllFlights,
  getFlightById,
  addFlight,
  editFlightById,
  deleteFlightById,
};
