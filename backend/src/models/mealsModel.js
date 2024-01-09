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
    default: 0,
  },
  water: {
    type: Number,
    default: 0,
  },
  target: {
    type: Number,
    default: 0,
  },
  haveEaten: {
    type: Boolean,
    default: false,
  }
});

mealSchema.index({ email: 1, date: 1, mealType: 1 }, { unique: true });

export const mealModel = mongoose.model("meals", mealSchema);