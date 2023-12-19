import React from 'react';
import SlideBar from "./SlideBar";
import {MealCard_2} from "./MealCard";


function Analytics(){
    return(
        <div class="row">
            <div class="col-2">
                <SlideBar class="col-3" />
            </div>
            <div class = "col-10 row">
                <MealCard_2 class="col-5" name="Today" content="Your calorie intake is 300kcal more than yesterday"/>
                <MealCard_2 class="col-5"  name="This month" content="Your average daily intake is 30% less than last month"/>
            </div>
        
        </div>
    );
}

export default Analytics