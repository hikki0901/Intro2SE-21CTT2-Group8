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

function MealPlan(){

    let day = "Monday";

    return(
    <div class="home-style row">
        <div class="col-2">
            <SlideBar class="col-3" />
        </div>
        <div class="col-5">
            <p class="plan">{day}'s plan</p>
            {Meals.map(createMealCard)}
        </div>

        <div class = "col-3 edit-half">
            <button type="button" class="col-12 btn button-color">Change</button>
            <div class="d-flex justify-content-between col-12">
                <button type="button" class="btn button-color">Add</button>
                <button type="button" class="btn button-color">Edit</button>
                <button type="button" class="btn button-color">Save</button>
            </div>
            <ul class="nav nav-pills flex-column align-items-center justify-content-between mb-auto">
            <li>
            <NavLink to='/meal-plan' className="nav-link link-body-emphasis" activeClassName="active" aria-current="page">
                Monday
              </NavLink>
            </li>
            <li>
            <NavLink to='/diet-diary' className="nav-link link-body-emphasis" activeClassName="active" aria-current="page">
                Tuesday
              </NavLink>
            </li>
            <li>
            <NavLink to='/analytics' className="nav-link link-body-emphasis" activeClassName="active" aria-current="page">
                Wednesday
              </NavLink>
            </li>
            <li>
            <NavLink to='/my-chat' className="nav-link link-body-emphasis" activeClassName="active" aria-current="page">
                Thursday
              </NavLink>
            </li>
            <li>
            <NavLink to='/support' className="nav-link link-body-emphasis" activeClassName="active" aria-current="page">
                Friday
              </NavLink>
            </li>
            <li>
            <NavLink to='/membership' className="nav-link link-body-emphasis" activeClassName="active" aria-current="page">
                Sartuday
              </NavLink>
            </li>
            <li>
            <NavLink to='/membership' className="nav-link link-body-emphasis" activeClassName="active" aria-current="page">
                Sunday
              </NavLink>
            </li>
            </ul>
        </div>
    </div>
    );
}

export default MealPlan