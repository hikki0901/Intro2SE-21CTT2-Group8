import React from 'react';
import SlideBar from "./SlideBar";
import {MealCard_3} from "./MealCard";
import Meals from '../data/Meals';
import "../CSS/mealPlan.css"
import {NavLink} from 'react-router-dom'

function createMealCard(mealItem){
    return(
        <MealCard_3
            key={mealItem.id}
            name={mealItem.name}
            foodList={mealItem.foods.map((food) => <li>{food}</li>)}
        />
    );
}

function DietDiary(){

    return(
    <div class="home-style row">
        <div class="col-2">
            <SlideBar class="col-3" />
        </div>
        <div class="col-5">
            <p class="plan">Today's plan</p>
            {Meals.map(createMealCard)}
        </div>

        
    </div>
    );
}

export default DietDiary