import React, { useState, useEffect } from 'react';
import SlideBar from "./SlideBar";
import MealCard from "./MealCard";
import Calendar from './Calendar';
import NutritionCard from './nutritionCard';
import "../CSS/Home.css";
import Meals from '../data/Meals';
import nutrition from '../data/nutrition-track';
import axios from 'axios';


function createMealCard(mealItem){
    return(
        <MealCard
            key={mealItem.id}
            name={mealItem.name}
            foodList={mealItem.foods.map((food) => <li>{food}</li>)}
        />
    );
}

function Home(){
    const [Meals, setMeals] = useState([]);
    const [calories, setCalories] = useState();
    const [water, setWater] = useState();
    const name = window.localStorage.getItem("username");

    useEffect(() => {
        var email = window.localStorage.getItem("email");
        
        const fetchMeals = async () => {
        try {
            const response = await axios.post("http://localhost:4000/meals/dashboard", {
            email, });
            setMeals(response.data.meals);
            const tmpCalories = parseInt(response.data.breakfastCalories, 10) + parseInt(response.data.lunchCalories, 10) + parseInt(response.data.dinnerCalories, 10);
            setCalories(tmpCalories);
            const tmpWater = parseInt(response.data.breakfastWater, 10) + parseInt(response.data.lunchWater, 10) + parseInt(response.data.dinnerWater, 10);
            console.log(response.data.breakfastWater);
            setWater(tmpWater)
        } catch (error) {
            console.error("Error fetching meals:", error);
            // Handle the error as needed
        }
        };

        fetchMeals();
    }, []);

    const nutrition = [{
        id: 1,
        name: "Calories",
        amount: calories,
        dimension: "kcal"
    },
    {
        id: 2,
        name: "Water",
        amount: water,
        dimension: "ml"
    }
    ]

    const progress = '75%';

    const quotes = ""

    return(
    <div class="home-style row">
        <div class="col-2">
            <SlideBar class="col-3" />
        </div>
        <div class="col">
            <p class="greeting">Hello {name}!</p>
            <p class="plan">Today's plan</p>
            {Meals.map(createMealCard)}
            <div class="progress-bar-div d-flex align-items-center justify-content-center">
                <p class="progress-word">progress</p>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style={{width: progress}} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="progress-word" >{progress}</p>
            </div>
        </div>
        <div class="col">
            <div class="row">
                {nutrition.map(nutriontype => (
                    <NutritionCard
                        id={nutriontype.key}
                        name={nutriontype.name}
                        amount={nutriontype.amount}
                        dimension={nutriontype.dimension}
                    />
                ))}
            </div>
            <div class="schedule p-1">
                <p class="quote-title">Schedule</p>
                <Calendar/>
            </div>
            <div class="quotes p-1">
                <p class="quote-title">Daily</p>
                <p class="quotes-content">"The greatest wealth is health."</p>
                <p class="author">-Virgil</p>
            </div>
        </div>
    </div>
    );
}

export default Home