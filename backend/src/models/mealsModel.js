import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  mealType: {
    type: Int16Array,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  calories: {
    type: Float32Array,
    required: true,
  },
});

export const mealModel = mongoose.model("meals", mealSchema);