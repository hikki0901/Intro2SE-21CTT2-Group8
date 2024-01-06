import React, {useState, useEffect} from 'react';
import SlideBar from "./SlideBar";
import Graph from './graph.jsx';
import {MealCard_2} from "./MealCard";
import axios from 'axios';
import "../CSS/Analytics.css";
import ClipLoader from "react-spinners/ClipLoader";



function Analytics(){
    const [calories, setCalories] = useState(0);
    const [loading, setLoading] = useState(true);
    const [BMIdata, setBMIdata] = useState();
    const [ratio, setRatio] = useState(0)
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
        try {
            const response = await axios.post("http://localhost:4000/monthlyStat/monthly-report", { email });
            setRatio(response.data.ratio)
        } catch (error) {
            console.error("Error fetching ratio:", error);
            // Handle the error as needed
        }
        try {
            const response = await axios.post("http://localhost:4000/monthlyStat/graph", { email });
            setBMIdata(response.data.BMI);
        } catch (error) {
            console.error("Error fetching meals:", error);
            // Handle the error as needed
        } finally {
            setLoading(false); // Set loading to false whether the request is successful or not
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

    function generateMealCardContent_(ratio) {
        let content;
      
        if (ratio >= 0) {
          content = `Your average daily intake is ${Math.abs(ratio) * 100}% compare to last month`;
        } else {
          content = "No data for last month";
        }
      
        return content;
      }

    if (loading) {
        // Render loading state or placeholder
        return (
            <div class="home-style row">
              <div class="col-2">
                <SlideBar class="col-3" />
              </div>
              <div class ="loading col-10">
                <ClipLoader
                color= "#36d7b7"
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"/>
              </div>
          </div>
        );
    }

    return(
        <div class="row">
            <div class="col-2">
                <SlideBar class="col-3" />
            </div>
            <div class = "col-10 row">
                <MealCard_2 class="col-5" name="Today" content={generateMealCardContent(calories)}/>
                <MealCard_2 class="col-5"  name="This month" content={generateMealCardContent_(ratio)}/>
                <div class="col-5 graph d-flex justify-content-center align-items-center">
                {Graph({BMIdata})}
                </div>
            </div>
        </div>
    );
}

export default Analytics