import React, {useState, useEffect} from 'react';
import SlideBar from "./SlideBar";
import Graph from './graph.jsx';
import {MealCard_2} from "./MealCard";
import axios from 'axios';
import "../CSS/Analytics.css";
import ClipLoader from "react-spinners/ClipLoader";
import {useLocation} from 'react-router-dom';



function Analytics(props){
    const [calories, setCalories] = useState(0);
    const [loading, setLoading] = useState(true);
    const [BMIdata, setBMIdata] = useState();
    const [ratio, setRatio] = useState(0);
    const isDietitian = props.userType === "dietitian";

    const location = useLocation();
    const data = location.state && location.state.data;

    useEffect(() => {
        var email = data ? data : window.localStorage.getItem("email");
        
        const fetchCalories = async () => {
        try {
          if (!window.localStorage.getItem("calories_difference")){
            const response = await axios.post("http://localhost:4000/meals/analytics", { email });
            setCalories(response.data.calories_difference);
            if (!isDietitian){
              window.localStorage.setItem("calories_difference", response.data.calories_difference);
            }
            
          } else {
            const storedCalories = window.localStorage.getItem("calories_difference");
            setCalories(storedCalories);
          }
        }
         catch (error) {
            console.error("Error fetching meals:", error);
            // Handle the error as needed
        }
        
        try {
          if (!window.localStorage.getItem("ratio")) {
            const response = await axios.post("http://localhost:4000/monthlyStat/monthly-report", { email });
            setRatio(response.data.ratio);
            if (!isDietitian){
              window.localStorage.setItem("ratio", response.data.ratio);
            }
          } else {
            const storedRatio = window.localStorage.getItem("ratio");
            setRatio(storedRatio);
          }
        } catch (error) {
            console.error("Error fetching ratio:", error);
            // Handle the error as needed
        }
        try {
          if (!window.localStorage.getItem("BMI")) {
            const response = await axios.post("http://localhost:4000/monthlyStat/graph", { email });
            setBMIdata(response.data.BMI);
            if (!isDietitian){
              window.localStorage.setItem("BMI", JSON.stringify(response.data.BMI));
            }
          } else {
            const storedBMI = JSON.parse(window.localStorage.getItem("BMI"));
            setBMIdata(storedBMI);
          }
            
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
                <SlideBar userType={props.userType} class="col-3" />
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
                <SlideBar userType={props.userType} class="col-3" />
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