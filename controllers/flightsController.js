import { Flight } from "../models/index.js";

const getAllFlights = async (req, res) => {
  res.send(await Flight.find());
};

export default {
  getAllFlights,
};
