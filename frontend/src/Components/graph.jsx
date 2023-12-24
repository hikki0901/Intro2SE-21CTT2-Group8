import React from 'react';
import BMIdata from "../data/BMIdata.js"
import Chart from "chart.js/auto";
import "react-chartjs-2";
import { Line } from "react-chartjs-2";

function Graph() {
  return (
    <Line data = {BMIdata}/>
  );
}
export default Graph;