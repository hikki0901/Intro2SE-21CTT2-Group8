import express from "express";
import { mealModel } from "../models/mealsModel.js";

const router = express.Router();

function getCurrentDayInISOFormat() {
    const currentDate = new Date();
    const isoDate = currentDate.toISOString().split('T')[0]; // Extracting the date part
  
    return isoDate;
  }
  
const currentDay = getCurrentDayInISOFormat();
  

router.post("/dashboard", async (req, res) => {
    const { email } = req.body;
    const Breakfast = await mealModel.findOne({ email, date: currentDay, mealType: "Breakfast" });
    const Lunch = await mealModel.findOne({ email, date: currentDay, mealType: "Lunch" });
    const Dinner = await mealModel.findOne({ email, date: currentDay, mealType: "Dinner" });

    const defaultMeal = {
        id: 0,
        name: "Not Available",
        foods: [],
        calories: 0
    };

    const meals = [
        {
          id: 1,
          name: "Breakfast",
          foods: Breakfast ? Breakfast.content : defaultMeal.foods,
        },
        {
          id: 2,
          name: "Lunch",
          foods: Lunch ? Lunch.content : defaultMeal.foods,
        },
        {
          id: 3,
          name: "Dinner",
          foods: Dinner ? Dinner.content : defaultMeal.foods,
        }
      ];
    res.status(200).json({
        meals, 
        breakfastCalories: Breakfast ? Breakfast.calories : defaultMeal.calories,
        lunchCalories: Lunch ? Lunch.calories : defaultMeal.calories,
        dinnerCalories: Dinner ? Dinner.calories : defaultMeal.calories });
});

router.post("/add", async (req, res) => {
    const { email, date, mealType, content, calories } = req.body;
    const newMeal = new mealModel({ email, date, mealType, content, calories});
    try {
        await newMeal.save();
        res.json({ success: true, message: "Meal created successfully" });
    } catch (error) {
        console.error("Error saving meal:", error);
        res.json({ message: "Internal server error" });
    }
});

export { router as mealRouter };