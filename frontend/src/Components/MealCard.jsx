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
        <ul class="">{props.foodList}</ul>
        <div class = "tg">
            <p id ="tg1"  class ="target">Target : {props.target}</p>
            <p id="tg2" class="intake">{props.calories}</p>
        </div>
    </div>);
}

function MealCard_4({ totalIntake, target }) {
    const message = totalIntake >= target ? "Great job!" : "Try harder";
  
    return (
      <div className="mealCard_4 p-2 mt-3">
        <p className="ttintake">Total intake</p>
        <p className="textStyle">{`${totalIntake}/${target} kcal`}</p>
        <p style={{ textAlign: 'center' }}>{message}</p>
      </div>
    );
  }

function Suggestions({suggest}) {
    return (<div class="suggestCard p-2 mt-3">
    <p  class="textSuggest">Suggests</p>
    <p class ="suggest">{suggest}</p>
</div>);}


export default MealCard
export {MealCard_2, MealCard_3, MealCard_4,Suggestions}