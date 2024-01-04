import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  date: {
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

notificationSchema.index({ email: 1, date: 1, subject: 1}, { unique: true });

export const notificationModel = mongoose.model("notifications", notificationSchema);