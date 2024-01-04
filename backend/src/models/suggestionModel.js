import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema({
    userEmail: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    context: {
      type: String,
      required: true,
    }
  });

mealSchema.index({ userEmail: 1, date: 1 }, { unique: true });

export const suggestionModel = mongoose.model("suggestions", suggestionSchema);
