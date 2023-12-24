import mongoose from "mongoose";

const dietitianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: null,
  },
});

export const dietitianModel = mongoose.model("dietitians", dietitianSchema);
