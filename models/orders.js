import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: { type: String, required: true },
  products: { type: Object, required: true },
  date: {
    day: { type: String, required: true },
    hours: { type: String, required: true },
    minutes: { type: String, required: true },
    milliseconds: { type: String, required: true },
  },
});

export const Order = mongoose.model("Order", orderSchema);
