import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  author: {
    id: { type: String, required: false },
    name: { type: String, required: true },
    surname: { type: String, required: false },
    age: { type: Number, required: false },
    alias: { type: String, required: false },
    avatar: { type: String, required: false },
  },
  text: { type: String, required: true },
  date: {
    day: { type: String, required: true },
    hours: { type: String, required: true },
    minutes: { type: String, required: true },
    milliseconds: { type: String, required: true },
  },
});

export const Message = mongoose.model("Message", messageSchema);
