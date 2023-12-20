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
        <div class = "tg">
            <p id ="tg1"  class ="target">target : 100%</p>
            <p id="tg2" class="intake">430 KCal</p>
        </div>
    </div>);
}

function MealCard_4(){
    return (<div class="mealCard_4 p-2 mt-3">
        <p  class="ttintake">Total intake</p>
        <p class ="textStyle">690/1000 kcal</p>
        <p style={{textAlign: 'center'}}>"Try harder"</p>
    </div>);
}

function Suggestions() {
    return (<div class="suggestCard p-2 mt-3">
    <p  class="textSuggest">Suggests</p>
    <p class ="suggest">"These small things: nutrition, place, climate, recreation, the whole casuistry of selfishness are inconceivably more important than everything one has taken to be important so far." Friedrich Nietzsche.</p>
</div>);
}

export default MealCard
export {MealCard_2, MealCard_3, MealCard_4,Suggestions}