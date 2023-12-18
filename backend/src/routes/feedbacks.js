import express from "express";
import { feedbackModel } from "../models/feedbacksModel.js";
import { userModel } from "../models/usersModel.js";

const router = express.Router();

router.post("/feedback", async (req, res) => {
    const { name, email, subject, message } = req.body;

    const user = await userModel.findOne({ email });
    if (!user){
        return res.status(401).json("Your email is not registered");
    }

    const newFeedback = new feedbackModel({name, email, subject, message});
    try {
        await newFeedback.save();
        res.status(201).json({ message: "Feedback sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export { router as feedbackRouter };