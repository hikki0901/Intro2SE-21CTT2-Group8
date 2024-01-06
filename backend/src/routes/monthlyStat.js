import express from "express";
import { monthlyStatModel } from "../models/monthlyStatModel.js";

const router = express.Router();

router.post("/add", async (req, res) => {
    const { email, month, avgCalories } = req.body;
    const newMonthlyStat = new monthlyStatModel({ email, month, avgCalories});
    try {
        await newMonthlyStat.save();
        res.json({ success: true, message: "Monthly Stat created successfully" });
    } catch (error) {
        console.error("Error saving monthly stat:", error);
        res.json({ message: "Internal server error" });
    }
});


export { router as monthlyStatRouter };