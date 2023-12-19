import React from 'react';
import SlideBar from "./SlideBar";
import MealCard from "./MealCard";
import NutritionCard from './nutritionCard';
import "../CSS/Home.css";
import Meals from '../data/Meals';
import nutrition from '../data/nutrition-track';

function createMealCard(mealItem){
    return(
        <MealCard
            key={mealItem.id}
            name={mealItem.name}
            foodList={mealItem.foods.map((food) => <li>{food}</li>)}
        />
    );
}

function Home(props){

    const progress = '75%';

    return(
    <div class="home-style row">
        <div class="col-2">
            <SlideBar class="col-3" />
        </div>
        <div class="col-5">
            <p class="greeting">Hello {props.userName}!</p>
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
        <div class="col-5">
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
            </div>
            <div class="quotes p-1">
                <p class="quote-title">Daily</p>
            </div>
        </div>
    </div>
    );
}

export default Home