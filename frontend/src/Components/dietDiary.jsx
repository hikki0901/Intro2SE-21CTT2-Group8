import React, { useState, useEffect} from 'react';
import SlideBar from "./SlideBar";
import {MealCard_3, MealCard_4, Suggestions} from "./MealCard";
import Meals from '../data/Meals';
import "../CSS/mealPlan.css"
import {NavLink, resolvePath} from 'react-router-dom';
import axios from 'axios';

function createMealCard(mealItem){
    return(
        <MealCard_3
            key={mealItem.id}
            name={mealItem.name}
            foodList={mealItem.foods.map((food) => <li>{food}</li>)}
            target={mealItem.target + "%"}
            calories={mealItem.totalCalories}
        />
    );
}


function createProgressCal({ totalIntake, target }) {
  return <MealCard_4 totalIntake={totalIntake} target={target} />;
}


function DietDiary(){

    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState("");
    const [Meals, setMeals] = useState([]);
    const [totalIntake, setTotalIntake] = useState(0);
    const [target, setTarget] = useState(0); 

    let calcBmi = (e) => {
        e.preventDefault()

        if(weight === 0 || height === 0) {
            alert('Hello please enter a valid number')
        }
        else {
            let bmiFormular = (weight/(height * height))
            setBmi(bmiFormular.toFixed(2))
        }     
    }

    useEffect(() => {
        var email = window.localStorage.getItem("email");
        
        const fetchMeals = async () => {
        try {
            const response = await axios.post("http://localhost:4000/meals/dietdiary", { email });
            setMeals(response.data.meals);
            setTotalIntake(response.data.totalIntake);
            setTarget(response.data.target);
        } catch (error) {
            console.error("Error fetching meals:", error);
            // Handle the error as needed
        }
        };

        fetchMeals();
    }, []);

    return (
    <div class="home-style row">
        <div class="col-2">
            <SlideBar class="col-3" />
        </div>
        <div class = "col-10">
            <div class ="row-2">
                <div class="row">
                    <p class="plan">Today's plan</p>
                </div>
                <div class =" row">
                    <div class="col-5">
                        {Meals.map(createMealCard)}
                    </div>

                    <div class="col-5 ">
                       {createProgressCal({ totalIntake, target })}


                        <createSuggestions>
                            <Suggestions/>
                        </createSuggestions>

                        <div class ="bmiCal">
                            <p class = "bmi">BMI Calculator</p>
                            <form onSubmit={calcBmi}>  
                                <div class ="row">
                                    <div class = "col-md-6">
                                        <div >
                                            <input class = "bmiCard" type='number' placeholder='Weight'value={weight} onChange={(e)=> setWeight(e.target.value)} />
                                        </div>

                                        <div >
                                            <input class ="bmiCard" type='number' placeholder='Height'value={height} onChange={(e)=> setHeight(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <p class = "bmiResult" > Result : {bmi}</p>
                                    </div>
                                </div>
                                <div  >
                                    <button  className='btn' type='submit'>Calculate</button>
                                </div>
                            </form> 
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default DietDiary