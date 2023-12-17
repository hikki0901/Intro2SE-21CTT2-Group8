import express from "express";
import { feedbackModel } from "../models/feedbacksModel.js";

const router = express.Router();

router.post("/feedback", async (req, res) => {
    const { name, email, subject, message } = req.body;
    const newFeedback = new feedbackModel({name, email, subject, message});
    try {
        await newFeedback.save();
        res.json({ message: "Feedback sent successfully" });
    } catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export { router as feedbackRouter };