import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  address: String,
  birthday: String,
  mobilenumber: String,
});

export const User = mongoose.model("User", userSchema);
