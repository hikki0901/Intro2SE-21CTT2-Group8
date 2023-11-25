import React from 'react';
import SlideBar from "./SlideBar";
import MealCard from "./MealCard";
import "../CSS/Home.css"

function Home(){
    const username = "Jessica";

    const progress_percent = "66%";

    return(
    <div class="home-style row">
        <div class="col-2">
            <SlideBar class="col-3" />
        </div>
        <div class="col-5">
            <p class="greeting">Hello {username}!</p>
            <p class="plan">Today's plan</p>
            <MealCard/>
            <div class="progress-bar">
            </div>
        </div>
        <div class="col-5">
            <div class="row">
                <div class="nutrition-track">
                </div>
                <div class="nutrition-track">
                </div>
            </div>
            <div class="schedule">
            </div>
            <div class="quotes">
            </div>
        </div>
    </div>
    );
}

export default Home