import React from "react";
import "../CSS/MealCard.css"

function MealCard(props){
    return (<div class="mealCard p-2 mt-3">
        <p class="meal-name">{props.name}</p>
        <ul class="mt-4">{props.foodList}</ul>
    </div>);
}

export default MealCard