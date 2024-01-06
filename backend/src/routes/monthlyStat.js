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
  router.post("/graph", async (req, res) => {
    const months = getRecentMonths()
    const { email } = req.body;

    const newMonthlyStat_1 = await monthlyStatModel.findOne({ email, month: months[0] });
    const newMonthlyStat_2 = await monthlyStatModel.findOne({ email, month: months[1] });
    const newMonthlyStat_3 = await monthlyStatModel.findOne({ email, month: months[2] });
    const newMonthlyStat_4 = await monthlyStatModel.findOne({ email, month: months[3] });
    const newMonthlyStat_5 = await monthlyStatModel.findOne({ email, month: months[4] });

    const BMIdata = {
        labels: [months[0], months[1], months[2], months[3], months[4]],
        datasets: [{
            label: "Your BMI",
            backgroundColor: "rgb(247, 139, 37)",
            borderColor: "rgb(247, 139, 37)",
            data: [newMonthlyStat_1 ? newMonthlyStat_1.BMI : 0, 
                newMonthlyStat_2 ? newMonthlyStat_2.BMI : 0, 
                newMonthlyStat_3 ? newMonthlyStat_3.BMI : 0, 
                newMonthlyStat_4 ? newMonthlyStat_4.BMI : 0, 
                newMonthlyStat_5 ? newMonthlyStat_5.BMI : 0],
        }, ],
    }

    res.status(200).json({BMI: BMIdata})
});

router.post("/monthly-report", async (req, res) => {
    const months = getRecentMonths()
    const { email } = req.body;

    const newMonthlyStat_4 = await monthlyStatModel.findOne({ email, month: months[3] });
    const newMonthlyStat_5 = await monthlyStatModel.findOne({ email, month: months[4] });

    const data_1 = newMonthlyStat_5 ? newMonthlyStat_5.BMI : 0
    const data_2 = newMonthlyStat_4 ? newMonthlyStat_4.BMI : 0

    if (data_2 = 0) {
        ratio = -1
    } else {
        ratio = data_1 / data_2
    }

    res.status(200).json({ratio})
});

router.post("/add", async (req, res) => {
    const { email, month, avgCalories, BMI } = req.body;
    const newMonthlyStat = new monthlyStatModel({ email, month, avgCalories, BMI});
    try {
        await newMonthlyStat.save();
        res.json({ success: true, message: "Monthly Stat created successfully" });
    } catch (error) {
        console.error("Error saving monthly stat:", error);
        res.json({ message: "Internal server error" });
    }
});


export { router as monthlyStatRouter };