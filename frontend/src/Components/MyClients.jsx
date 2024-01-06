import React, { useState, useEffect, useRef } from 'react';
import SlideBar from "./SlideBar";
import "../CSS/myChat.css"

function MyClients(){

    return(
        <div class="row">
        <div class="col-2">
            <SlideBar userType="dietitian" class="col-3" />
        </div>
        <div class="col-10">
            
        </div>
        <div class="verticalLine1" />
    </div>
    );
}

export default MyClients