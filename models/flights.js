import mongoose from "mongoose";

const flightSchema = mongoose.Schema({
  name: { type: String, required: true },
  availability: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

export const Flight = mongoose.model("Flight", flightSchema);
