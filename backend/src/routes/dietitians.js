import express from "express";
import { dietitianModel } from "../models/dietitiansModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/add", async (req, res) => {
    const { firstName, lastName, DOB, phone, email, password, gender } = req.body;
    const dietitian = await dietitianModel.findOne({ email });

    if (dietitian) {
        return res.json({ message: "Dietitian already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDietitian = new dietitianModel({firstName, lastName, DOB, phone, email, password:hashedPassword, gender });
    try {
        await newDietitian.save();
        res.json({ success: true, message: "Dietitian registered successfully" });
    } catch (error) {
        console.error("Error saving dietitian:", error);
        res.json({ message: "Internal server error" });
    }
});

export { router as dietitianRouter };