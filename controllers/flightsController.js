import logger from "../helpers/logger.js";
import { Flight } from "../models/index.js";

const getAllFlights = async (req, res) => {
  try {
    res.send(await Flight.find());
  } catch (error) {
    logger.error(error);
    res.send(error);
  }
};

const addFlight = async (req, res) => {
  const { flight } = req.body;
  try {
    const flightAdded = await Flight.insertMany(flight);
    await res.send({ operationStatus: "successful", flightAdded: flightAdded });
  } catch (error) {
    logger.error(error);
    res.send(error);
  }
};

export default {
  getAllFlights,
  addFlight,
};
