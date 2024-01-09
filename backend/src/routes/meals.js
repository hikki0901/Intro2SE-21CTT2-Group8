import express from "express";
import { mealModel } from "../models/mealsModel.js";

const router = express.Router();

function getCurrentDayInISOFormat() {
    const currentDate = new Date();
    const isoDate = currentDate.toISOString().split('T')[0]; // Extracting the date part
  
    return isoDate;
  }
  
function getYesterdayInISOFormat() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1); // Subtract one day
    
    const isoDate = currentDate.toISOString().split('T')[0]; // Extracting the date part
    
    return isoDate;
  }
const today = getCurrentDayInISOFormat();
const yesterday = getYesterdayInISOFormat();

function getWeekDates() {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const diff = currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // adjust when Sunday is the first day of the week

  const startDate = new Date(currentDate.setDate(diff));
  const endDate = new Date(currentDate.setDate(diff + 6));

  const dates = [];
  const currentDateIter = new Date(startDate);

  while (currentDateIter <= endDate) {
    dates.push(currentDateIter.toISOString().split('T')[0]);
    currentDateIter.setDate(currentDateIter.getDate() + 1);
  }

  return dates;
}

function calculateTotals(meals) {
  let totalIntake = 0;
  let target = 0;

  meals.forEach((meal) => {
    totalIntake += meal.calories * (meal.target)/100;
    target += meal.calories;
  });

  return { totalIntake, target };
}

const thisWeekDates = getWeekDates();


const defaultMeal = {
  id: 0,
  name: "Not Available",
  foods: [],
  calories: 0,
  water: 0,
  target: 0,
};

router.post("/analytics", async (req, res) => {
    const { email } = req.body;
    const Breakfast = await mealModel.findOne({ email, date: today, mealType: "Breakfast" });
    const Lunch = await mealModel.findOne({ email, date: today, mealType: "Lunch" });
    const Dinner = await mealModel.findOne({ email, date: today, mealType: "Dinner" });

    const Breakfast_y = await mealModel.findOne({ email, date: yesterday, mealType: "Breakfast" });
    const Lunch_y = await mealModel.findOne({ email, date: yesterday, mealType: "Lunch" });
    const Dinner_y = await mealModel.findOne({ email, date: yesterday, mealType: "Dinner" });

    const calories = [Breakfast ? Breakfast.calories : 0, Lunch ? Lunch.calories : 0, Dinner ? Dinner.calories : 0,
                      Breakfast_y ? Breakfast_y.calories : 0, Lunch_y ? Lunch_y.calories : 0, Dinner_y ? Dinner_y.calories : 0]

    const calories_difference = calories[0] + calories[1] + calories[2] - calories[3] - calories[4] - calories[5]

    res.status(200).json({
      calories_difference
      });
});

router.post("/dashboard", async (req, res) => {
    const { email } = req.body;
    const Breakfast = await mealModel.findOne({ email, date: today, mealType: "Breakfast" });
    const Lunch = await mealModel.findOne({ email, date: today, mealType: "Lunch" });
    const Dinner = await mealModel.findOne({ email, date: today, mealType: "Dinner" });

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
        breakfastWater: Breakfast ? Breakfast.water : defaultMeal.water,
        lunchCalories: Lunch ? Lunch.calories : defaultMeal.calories,
        lunchWater: Lunch ? Lunch.water : defaultMeal.water,
        dinnerCalories: Dinner ? Dinner.calories : defaultMeal.calories,
        dinnerWater: Dinner ? Dinner.water : defaultMeal.water,
        });
});

router.post("/mealplan", async (req, res) => {
  const { email } = req.body;
  const mondayBreakfast = await mealModel.findOne({ email, date: thisWeekDates[0], mealType: "Breakfast" });
  const mondayLunch = await mealModel.findOne({ email, date: thisWeekDates[0], mealType: "Lunch" });
  const mondayDinner = await mealModel.findOne({ email, date: thisWeekDates[0], mealType: "Dinner" });

  const tuesdayBreakfast = await mealModel.findOne({ email, date: thisWeekDates[1], mealType: "Breakfast" });
  const tuesdayLunch = await mealModel.findOne({ email, date: thisWeekDates[1], mealType: "Lunch" });
  const tuesdayDinner = await mealModel.findOne({ email, date: thisWeekDates[1], mealType: "Dinner" });

  const wednesdayBreakfast = await mealModel.findOne({ email, date: thisWeekDates[2], mealType: "Breakfast" });
  const wednesdayLunch = await mealModel.findOne({ email, date: thisWeekDates[2], mealType: "Lunch" });
  const wednesdayDinner = await mealModel.findOne({ email, date: thisWeekDates[2], mealType: "Dinner" });

  const thursdayBreakfast = await mealModel.findOne({ email, date: thisWeekDates[3], mealType: "Breakfast" });
  const thursdayLunch = await mealModel.findOne({ email, date: thisWeekDates[3], mealType: "Lunch" });
  const thursdayDinner = await mealModel.findOne({ email, date: thisWeekDates[3], mealType: "Dinner" });

  const fridayBreakfast = await mealModel.findOne({ email, date: thisWeekDates[4], mealType: "Breakfast" });
  const fridayLunch = await mealModel.findOne({ email, date: thisWeekDates[4], mealType: "Lunch" });
  const fridayDinner = await mealModel.findOne({ email, date: thisWeekDates[4], mealType: "Dinner" });

  const saturdayBreakfast = await mealModel.findOne({ email, date: thisWeekDates[5], mealType: "Breakfast" });
  const saturdayLunch = await mealModel.findOne({ email, date: thisWeekDates[5], mealType: "Lunch" });
  const saturdayDinner = await mealModel.findOne({ email, date: thisWeekDates[5], mealType: "Dinner" });

  const sundayBreakfast = await mealModel.findOne({ email, date: thisWeekDates[6], mealType: "Breakfast" });
  const sundayLunch = await mealModel.findOne({ email, date: thisWeekDates[6], mealType: "Lunch" });
  const sundayDinner = await mealModel.findOne({ email, date: thisWeekDates[6], mealType: "Dinner" });

  const Meals1 = [{
    id: 1,
    meal_info: [{
            id: 1,
            name: "Breakfast",
            foods: mondayBreakfast ? mondayBreakfast.content : defaultMeal.foods,
            target: mondayBreakfast ? mondayBreakfast.target : defaultMeal.target,
            totalCalories: mondayBreakfast ? mondayBreakfast.calories : defaultMeal.calories,
        },{
            id: 2,
            name: "Lunch",
            foods: mondayLunch ? mondayLunch.content : defaultMeal.foods,
            target: mondayLunch ? mondayLunch.target : defaultMeal.target,
            totalCalories: mondayLunch ? mondayLunch.calories : defaultMeal.calories,
        },{
            id: 3,
            name: "Dinner",
            foods: mondayDinner ? mondayDinner.content : defaultMeal.foods,
            target: mondayDinner ? mondayDinner.target : defaultMeal.target,
            totalCalories: mondayDinner ? mondayDinner.calories : defaultMeal.calories,
        }]
    },{
    id: 2,
    meal_info: [{
            id: 1,
            name: "Breakfast",
            foods: tuesdayBreakfast ? tuesdayBreakfast.content : defaultMeal.foods,
            target: tuesdayBreakfast ? tuesdayBreakfast.target : defaultMeal.target,
            totalCalories: tuesdayBreakfast ? tuesdayBreakfast.calories : defaultMeal.calories,
        },{
            id: 2,
            name: "Lunch",
            foods: tuesdayLunch ? tuesdayLunch.content : defaultMeal.foods,
            target: tuesdayLunch ? tuesdayLunch.target : defaultMeal.target,
            totalCalories: tuesdayLunch ? tuesdayLunch.calories : defaultMeal.calories,
        },{
            id: 3,
            name: "Dinner",
            foods: tuesdayDinner ? tuesdayDinner.content : defaultMeal.foods,
            target: tuesdayDinner ? tuesdayDinner.target : defaultMeal.target,
            totalCalories: tuesdayDinner ? tuesdayDinner.calories : defaultMeal.calories,
        }]
    },{
    id: 3,
    meal_info: [{
            id: 1,
            name: "Breakfast",
            foods: wednesdayBreakfast ? wednesdayBreakfast.content : defaultMeal.foods,
            target: wednesdayBreakfast ? wednesdayBreakfast.target : defaultMeal.target,
            totalCalories: wednesdayBreakfast ? wednesdayBreakfast.calories : defaultMeal.calories,
        },{
            id: 2,
            name: "Lunch",
            foods: wednesdayLunch ? wednesdayLunch.content : defaultMeal.foods,
            target: wednesdayLunch ? wednesdayLunch.target : defaultMeal.target,
            totalCalories: wednesdayLunch ? wednesdayLunch.calories : defaultMeal.calories,
        },{
            id: 3,
            name: "Dinner",
            foods: wednesdayDinner ? wednesdayDinner.content : defaultMeal.foods,
            target: wednesdayDinner ? wednesdayDinner.target : defaultMeal.target,
            totalCalories: wednesdayDinner ? wednesdayDinner.calories : defaultMeal.calories,
        }]
    },{
    id: 4,
    meal_info: [{
            id: 1,
            name: "Breakfast",
            foods: thursdayBreakfast ? thursdayBreakfast.content : defaultMeal.foods,
            target: thursdayBreakfast ? thursdayBreakfast.target : defaultMeal.target,
            totalCalories: thursdayBreakfast ? thursdayBreakfast.calories : defaultMeal.calories,
        },{
            id: 2,
            name: "Lunch",
            foods: thursdayLunch ? thursdayLunch.content : defaultMeal.foods,
            target: thursdayLunch ? thursdayLunch.target : defaultMeal.target,
            totalCalories: thursdayLunch ? thursdayLunch.calories : defaultMeal.calories,
        },{
            id: 3,
            name: "Dinner",
            foods: thursdayDinner ? thursdayDinner.content : defaultMeal.foods,
            target: thursdayDinner ? thursdayDinner.target : defaultMeal.target,
            totalCalories: thursdayDinner ? thursdayDinner.calories : defaultMeal.calories,
        }]
    },{
    id: 5,
    meal_info: [{
            id: 1,
            name: "Breakfast",
            foods: fridayBreakfast ? fridayBreakfast.content : defaultMeal.foods,
            target: fridayBreakfast ? fridayBreakfast.target : defaultMeal.target,
            totalCalories: fridayBreakfast ? fridayBreakfast.calories : defaultMeal.calories,
        },{
            id: 2,
            name: "Lunch",
            foods: fridayLunch ? fridayLunch.content : defaultMeal.foods,
            target: fridayLunch ? fridayLunch.target : defaultMeal.target,
            totalCalories: fridayLunch ? fridayLunch.calories : defaultMeal.calories,
        },{
            id: 3,
            name: "Dinner",
            foods: fridayDinner ? fridayDinner.content : defaultMeal.foods,
            target: fridayDinner ? fridayDinner.target : defaultMeal.target,
            totalCalories: fridayDinner ? fridayDinner.calories : defaultMeal.calories,
        }]
    },{
    id: 6,
    meal_info: [{
            id: 1,
            name: "Breakfast",
            foods: saturdayBreakfast ? saturdayBreakfast.content : defaultMeal.foods,
            target: saturdayBreakfast ? saturdayBreakfast.target : defaultMeal.target,
            totalCalories: saturdayBreakfast ? saturdayBreakfast.calories : defaultMeal.calories,
        },{
            id: 2,
            name: "Lunch",
            foods: saturdayLunch ? saturdayLunch.content : defaultMeal.foods,
            target: saturdayLunch ? saturdayLunch.target : defaultMeal.target,
            totalCalories: saturdayLunch ? saturdayLunch.calories : defaultMeal.calories,
        },{
            id: 3,
            name: "Dinner",
            foods: saturdayDinner ? saturdayDinner.content : defaultMeal.foods,
            target: saturdayDinner ? saturdayDinner.target : defaultMeal.target,
            totalCalories: saturdayDinner ? saturdayDinner.calories : defaultMeal.calories,
        }]
    },{
    id: 7,
    meal_info: [{
            id: 1,
            name: "Breakfast",
            foods: sundayBreakfast ? sundayBreakfast.content : defaultMeal.foods,
            target: sundayBreakfast ? sundayBreakfast.target : defaultMeal.target,
            totalCalories: sundayBreakfast ? sundayBreakfast.calories : defaultMeal.calories,
        },{
            id: 2,
            name: "Lunch",
            foods: sundayLunch ? sundayLunch.content : defaultMeal.foods,
            target: sundayLunch ? sundayLunch.target : defaultMeal.target,
            totalCalories: sundayLunch ? sundayLunch.calories : defaultMeal.calories,
        },{
            id: 3,
            name: "Dinner",
            foods: sundayDinner ? sundayDinner.content : defaultMeal.foods,
            target: sundayDinner ? sundayDinner.target : defaultMeal.target,
            totalCalories: sundayDinner ? sundayDinner.calories : defaultMeal.calories,
        }]
    },

]
  res.status(200).json({ Meals1 });
});

router.post("/dietdiary", async (req, res) => {
    const { email } = req.body;
    const Breakfast = await mealModel.findOne({ email, date: today, mealType: "Breakfast" });
    const Lunch = await mealModel.findOne({ email, date: today, mealType: "Lunch" });
    const Dinner = await mealModel.findOne({ email, date: today, mealType: "Dinner" });
    const meals = [
        {
          id: 1,
          name: "Breakfast",
          foods: Breakfast ? Breakfast.content : defaultMeal.foods,
          target: Breakfast ? Breakfast.target : defaultMeal.target,
          calories: Breakfast ? Breakfast.calories : defaultMeal.calories,
          haveEaten: Breakfast ? Breakfast.haveEaten : false,
        },
        {
          id: 2,
          name: "Lunch",
          foods: Lunch ? Lunch.content : defaultMeal.foods,
          target: Lunch ? Lunch.target : defaultMeal.target,
          calories: Lunch ? Lunch.calories : defaultMeal.calories,
          haveEaten: Lunch ? Lunch.haveEaten : false,
        },
        {
          id: 3,
          name: "Dinner",
          foods: Dinner ? Dinner.content : defaultMeal.foods,
          target: Dinner ? Dinner.target : defaultMeal.target,
          calories: Dinner ? Dinner.calories : defaultMeal.calories,
          haveEaten: Dinner ? Dinner.haveEaten : false,
        }
      ];
    const { totalIntake, target } = calculateTotals(meals);
    
    res.status(200).json({ meals, totalIntake, target });
});

router.post("/add", async (req, res) => {
    const { email, date, mealType, content, calories, water, target } = req.body;
    const newMeal = new mealModel({ email, date, mealType, content, calories, water, target});
    try {
        await newMeal.save();
        res.json({ success: true, message: "Meal created successfully" });
    } catch (error) {
        console.error("Error saving meal:", error);
        res.json({ message: "Internal server error" });
    }
});

router.post("/save", async (req, res) => {
  try {
    const { email, Meals1 } = req.body;
    console.log(Meals1[0].meal_info[0].foods);

    var updatedMeals
    for (let i = 0; i < 7; i++)
      for (let j = 0; j < 3; j++) {
        var s;
        if (j == 0) { s = "Breakfast" }
        if (j == 1) { s = "Lunch" }
        if (j == 2) { s = "Dinner" }

        const filter = { email, date: thisWeekDates[i], mealType: s };
        const update = {
          content: Meals1[i].meal_info[j].foods,
          calories: Meals1[i].meal_info[j].totalCalories,
          haveEaten: Meals1[i].meal_info[j].eaten,
        };

        const existingMeals = await mealModel.findOne(filter);
        if (existingMeals) {
          if (existingMeals.content) {
            updatedMeals = await mealModel.updateOne(filter, update);
          } else {
            updatedMeals = await mealModel.updateOne(filter,
              {
                $push: { content: Meals1[i].meal_info[j].foods },
                calories: Meals1[i].meal_info[j].totalCalories,
                haveEaten: Meals1[i].meal_info[j].eaten,
              });
          }
        } else {
          const newMeals = new mealModel({ ...filter, ...update });
          await newMeals.save();
          console.log("User information added successfully");
        }
      }
    if (updatedMeals.acknowledged) {
      res.json({ success: true, message: "User information updated successfully" });
    } else {
      res.json({ success: false, message: "Failed to update user information" });
    }
  } catch (error) {
    console.error("Error during settings update:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/haveeaten", async (req, res) => {
  const {email, meals} =  req.body;
  const updatedMeals = await mealModel.updateOne({email, date: today, mealType: meals.name}, {
    haveEaten: meals.haveEaten
  })
  if (updatedMeals.acknowledged) {
    res.status(200).json({ success: true, message: "Successfully updated meal"})
  } else {
    res.status(200).json({ success: false, message: "Failed to update meal"})
  }
  
});

export { router as mealRouter };