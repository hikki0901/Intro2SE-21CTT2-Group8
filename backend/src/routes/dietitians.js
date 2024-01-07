import express from "express";
import { dietitianModel } from "../models/dietitiansModel.js";
import { personalDietitianModel } from '../models/perDietModel.js'
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/add", async (req, res) => {
    const { firstName, lastName, DOB, phone, email, password, gender, degree } = req.body;
    const dietitian = await dietitianModel.findOne({ email });

    if (dietitian) {
        return res.json({ message: "Dietitian already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDietitian = new dietitianModel({firstName, lastName, DOB, phone, email, password:hashedPassword, gender, degree });
    try {
        await newDietitian.save();
        res.json({ success: true, message: "Dietitian registered successfully" });
    } catch (error) {
        console.error("Error saving dietitian:", error);
        res.json({ message: "Internal server error" });
    }
});

router.post("/view", async (req, res) => {
    try {
      const dietitians = await dietitianModel.find().select('firstName lastName degree');
  
      res.status(200).json({dietitians});
    } catch (error) {
      console.error('Error retrieving dietitians:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


export { router as dietitianRouter };