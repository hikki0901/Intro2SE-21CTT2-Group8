import React, {useState} from 'react';
import SlideBar from "./SlideBar";
import {MealCard_3} from "./MealCard";
import Meals1 from '../data/test';
import "../CSS/mealPlan.css"

function getDayMeal(i){
  return (Meals1[i].meal_info);
  
}

function createMealCard(mealItem){
    return(
        <MealCard_3
            key={mealItem.id}
            name={mealItem.name}
            foodList={mealItem.foods.map((food) => <li>{food}</li>)}
            target={mealItem.target}
            calories={mealItem.totalCalories}
        />
    );
}

function getDay(i){
  switch(i){
    case 0:
      return "Monday";
      break;
    case 1:
      return "Tuesday";
      break;
    case 2:
      return "Wednesday";
      break;
    case 3:
      return "Thursday";
      break;
    case 4:
      return "Friday";
      break;
    case 5:
      return "Saturday";
      break;
    case 6:
      return "Sunday";
      break;
  }
}


function MealPlan(){

    const [day, setDay] = useState(0);

    const handleClick = (i)=>{
      setDay(i)
    };

    return(
    <div class="home-style row">
        <div class="col-2">
            <SlideBar class="col-3" />
        </div>
        <div class="col-5">
            <p class="plan">{getDay(day)}'s plan</p>
            {getDayMeal(day).map(createMealCard)}
        </div>

        <div class = "col-5 edit-half">
        <button type="button" class="col-12 button-color" id="change">Change</button>
            <div class="d-flex justify-content-center col-12">
                <button type="button" class="button-color">Add</button>
                <button type="button" class="button-color">Edit</button>
                <button type="button" class="button-color">Save</button>
            </div>
            <ul class="nav nav-pills flex-column align-items-center justify-content-between mb-auto">
            <li>
            <a type='button' onClick={() => handleClick(0)} className={`nav-link link-body-emphasis ${day === 0 ? 'active' : ''}`} aria-current="page">
                Monday
              </a>
            </li>
            <li>
            <a type='button' onClick={() => handleClick(1)} className={`nav-link link-body-emphasis ${day === 1 ? 'active' : ''}`} aria-current="page">
                Tuesday
              </a>
            </li>
            <li> 
            <a type='button' onClick={() => handleClick(2)} className={`nav-link link-body-emphasis ${day === 2 ? 'active' : ''}`} aria-current="page">
                Wednesday
              </a>
            </li>
            <li>
            <a type='button' onClick={() => handleClick(3)} className={`nav-link link-body-emphasis ${day === 3? 'active' : ''}`} aria-current="page">
                Thursday
              </a>
            </li>
            <li>
            <a type='button' onClick={() => handleClick(4)} className={`nav-link link-body-emphasis ${day === 4 ? 'active' : ''}`} aria-current="page">
                Friday
              </a>
            </li>
            <li>
            <a type='button' onClick={() => handleClick(5)} className={`nav-link link-body-emphasis ${day === 5 ? 'active' : ''}`} aria-current="page">
                Sartuday
              </a>
            </li>
            <li>
            <a type='button' onClick={() => handleClick(6)} className={`nav-link link-body-emphasis ${day === 6 ? 'active' : ''}`} aria-current="page">
                Sunday
              </a>
            </li>
            </ul>
        </div>
    </div>
    );
}

export default MealPlan