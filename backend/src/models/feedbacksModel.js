import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

feedbackSchema.index({name: 1, email: 1, subject: 1}, { unique: true });

export const feedbackModel = mongoose.model("feedbacks", feedbackSchema);