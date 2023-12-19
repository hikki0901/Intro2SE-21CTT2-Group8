import React from "react";
import "../CSS/MealCard.css"

function MealCard(props){
    return (<div class="mealCard p-2 mt-3">
        <p class="meal-name">{props.name}</p>
        <ul class="mt-4">{props.foodList}</ul>
    </div>);
}

function MealCard_2(props){
    return (<div class="mealCard p-2 mt-3">
        <p class="meal-name">{props.name}</p>
        <p class="content">{props.content}</p>
    </div>);
}

function MealCard_3(props){
    return (<div class="mealCard_3 p-2 mt-3">
        <p class="meal-name">{props.name}</p>
        <ul class="mt-4">{props.foodList}</ul>
        <p class="intake">430 KCal</p>
    </div>);
}

export default MealCard
export {MealCard_2, MealCard_3}