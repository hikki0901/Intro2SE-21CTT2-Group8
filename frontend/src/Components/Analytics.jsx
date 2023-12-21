import React from 'react';
import SlideBar from "./SlideBar";
import Graph from './graph.jsx';
import {MealCard_2} from "./MealCard";
import "../CSS/Analytics.css";



function Analytics(){
    return(
        <div class="row">
            <div class="col-2">
                <SlideBar class="col-3" />
            </div>
            <div class = "col-10 row">
                <MealCard_2 class="col-5" name="Today" content="Your calorie intake is 300kcal more than yesterday"/>
                <MealCard_2 class="col-5"  name="This month" content="Your average daily intake is 30% less than last month"/>
                <div class="col-5 graph d-flex justify-content-center align-items-center">
                    <Graph />
                </div>
            </div>
        </div>
    );
}

export default Analytics