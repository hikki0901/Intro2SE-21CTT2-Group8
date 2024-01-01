import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  mealType: {
    type: String,
    required: true,
  },
  content: {
    type: [String],
    default: [],
  },
  calories: {
    type: Number,
    default: null,
  },
});

mealSchema.index({ email: 1, date: 1, mealType: 1 }, { unique: true });

export const mealModel = mongoose.model("meals", mealSchema);