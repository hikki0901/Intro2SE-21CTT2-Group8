import mongoose from "mongoose";

const monthlyStatSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    avgCalories: {
      type: Number,
      required: true,
    },
    BMI: {
      type: Number,
      required: true,
    }
  });

  monthlyStatSchema.index({ email: 1, month: 1 }, { unique: true });

export const monthlyStatModel = mongoose.model("monthlyStat", monthlyStatSchema);
