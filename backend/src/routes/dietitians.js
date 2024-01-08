import express from "express";
import { dietitianModel } from "../models/dietitiansModel.js";
import { userModel } from '../models/usersModel.js';
import {mealModel} from '../models/mealsModel.js';
import bcrypt from "bcrypt";

const router = express.Router();

function getCurrentDayInISOFormat() {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString().split('T')[0]; // Extracting the date part

  return isoDate;
}
const today = getCurrentDayInISOFormat();

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
  
router.post("/viewclient", async (req, res) => {
  const {email} = req.body;
  const progress = []
  try {
    const users = await userModel.find({dietitianEmail: email}).select('firstName lastName DOB gender height weight email');
    for (const user of users) {
      const userMeals = await mealModel.find({ email: user.email, date: today}).select('target');
      if (userMeals) {
        let target = 0;
        for (let i = 0; i < userMeals.length; i++) {
          target += (userMeals[i].target ? userMeals[i].target : 0) / userMeals.length;
        }
        progress.push({firstName: user.firstName, lastName: user.lastName, DOB: user.DOB, gender: user.gender, height: user.height, weight: user.weight,target: target});
      }
      
      }
    res.status(200).json({progress}); 
  } catch (error) {
    console.error('Error retrieving dietitians:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router as dietitianRouter };