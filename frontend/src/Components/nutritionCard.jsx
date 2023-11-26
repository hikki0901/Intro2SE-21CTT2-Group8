import React from "react";
import "../CSS/nutritionCard.css"

function NutritionCard(props){
    return (<div class="nutrition-track p-2">
        <p class="name">{props.name}</p>
        <p class ="amount">{props.amount}</p>
        <p class ="dimension">{props.dimension}</p>
    </div>);
}

export default NutritionCard