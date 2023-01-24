import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  mail: String,
  password: String,
});

export const User = mongoose.model("User", userSchema);
