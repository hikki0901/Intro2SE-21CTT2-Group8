import React from "react";
import "../CSS/MealCard.css"

function MealCard(props){
    return (<div class="mealCard p-2 mt-3">
        <p class="meal-name">{props.name}</p>
        <ul class="">{props.foodList}</ul>
    </div>);
}

function MealCard_2(props){
    return (<div class="mealCard_5 p-2 mt-3">
        <p class="meal-name">{props.name}</p>
        <p class="content">{props.content}</p>
    </div>);
}

function MealCard_3(props){

    const update = () => {
      if (props.eaten){
      props.updateIntake(props.calories, false);
    }
    else{
      props.updateIntake(props.calories, true);
    }
    props.updateEaten(0, 0, false);
  }

    return (<div class="mealCard_3 p-2 mt-3">
        <p class="meal-name">{props.name}</p>
        <ul class="" >{props.foodList}</ul>
        <div class = "tg">
            <input class="form-check-input target"  id ="tg1 flexCheckChecked" type="checkbox" propchecked checked={props.eaten} onClick={update}/>
            <p id="tg2" class="intake">{props.calories} Cal</p>
        </div>
    </div>);
}

function MealCard_5(props){

  return (<div class="mealCard_3 p-2 mt-3">
      <p class="meal-name">{props.name}</p>
      <ul class="" >{props.foodList}</ul>
      <div class = "tg">
          <p id="tg2" class="intake">{props.calories} Cal</p>
      </div>
  </div>);
}

function MealCard_4({ totalIntake, target }) {
    const message = totalIntake >= target ? "Great job!" : "Try harder";
  
    return (
      <div className="mealCard_4 p-2 mt-3">
        <p className="ttintake">Total intake</p>
        <p className="textStyle text-center">{`${totalIntake}/${target} kcal`}</p>
        <p style={{ textAlign: 'center' }}>{message}</p>
      </div>
    );
  }

function Suggestions({suggest, userType, handleSuggestionChange}) {

    const isDietitian = userType === "dietitian";

    return (<div class="suggestCard p-2 mt-3">
    <p  class="textSuggest">Suggests</p>
    {isDietitian ? (
      <label className='suggest'>
      <input
        type="text"
        value={suggest}
        onChange={handleSuggestionChange}
        className="scrollableInput"
      />
      </label>
      ) : (
        <p className="suggest">{suggest}</p>
      )}
</div>);}


export default MealCard
export {MealCard_2, MealCard_3, MealCard_4, MealCard_5, Suggestions}