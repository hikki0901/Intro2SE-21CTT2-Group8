import express from "express";
import { monthlyStatModel } from "../models/monthlyStatModel.js";

const router = express.Router();

function getRecentMonths() {
    const currentDate = new Date();
    const months = [];
  
    for (let i = 0; i < 5; i++) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-based, so adding 1
      const formattedMonth = `${year}-${month.toString().padStart(2, '0')}`;
      
      months.unshift(formattedMonth); // Adding to the beginning of the array
      currentDate.setMonth(currentDate.getMonth() - 1); // Move to the previous month
    }
  
    return months;
  }


router.post("/add", async (req, res) => {
    const monthA = getRecentMonths();
    console.log(monthA);
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