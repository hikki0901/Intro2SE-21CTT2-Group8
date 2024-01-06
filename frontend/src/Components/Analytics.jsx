import React, {useState, useEffect} from 'react';
import SlideBar from "./SlideBar";
import Graph from './graph.jsx';
import {MealCard_2} from "./MealCard";
import axios from 'axios';
import "../CSS/Analytics.css";



function Analytics(){
    const [calories, setCalories] = useState(0);
    useEffect(() => {
        var email = window.localStorage.getItem("email");
        
        const fetchCalories = async () => {
        try {
            const response = await axios.post("http://localhost:4000/meals/analytics", { email });
            setCalories(response.data.calories_difference)
        } catch (error) {
            console.error("Error fetching meals:", error);
            // Handle the error as needed
        }
        };
        fetchCalories();

    }, []);
    function generateMealCardContent(calories_difference) {
        let content;
      
        if (calories_difference > 0) {
          content = `Your calorie intake is ${calories_difference}kcal more than yesterday.`;
        } else if (calories_difference < 0) {
          content = `Your calorie intake is ${Math.abs(calories_difference)}kcal less than yesterday.`;
        } else {
          content = `Your calorie intake is the same as yesterday.`;
        }
      
        return content;
      }
    return(
        <div class="row">
            <div class="col-2">
                <SlideBar class="col-3" />
            </div>
            <div class = "col-10 row">
                <MealCard_2 class="col-5" name="Today" content={generateMealCardContent(calories)}/>
                <MealCard_2 class="col-5"  name="This month" content="Your average daily intake is 30% less than last month"/>
                <div class="col-5 graph d-flex justify-content-center align-items-center">
                    <Graph />
                </div>
            </div>
        </div>
    );
}

export default Analytics