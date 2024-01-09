import React, {useState, useEffect} from 'react';
import SlideBar from "./SlideBar";
import {MealCard_5} from "./MealCard";
import {useNavigate} from 'react-router-dom';
// import Meals1 from '../data/test';
import "../CSS/mealPlan.css";
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";

function getDayMeal(Meals1, i){
  return (Meals1[i].meal_info);
  
}

function createMealCard(update_meals1_to_backend, mealItem, TempMeal, setMeals1, handleTextChange, handleTextChangeForTarget, handleAddFood, handleDeleteFood, editing, saved, setSaved, add, setAdd, remove, setRemove) {

  if (mealItem.foods.length === 0){
    mealItem.foods.push("");
  }

  const handleInput = (e, mealId, foodIndex) => {
    handleTextChange(e, mealId, foodIndex, editing, setMeals1, update_meals1_to_backend);
    if (!editing && !saved) {
      setSaved(true);
    }
    if (add === true){
      handleAddFood(mealId, add, setAdd)
    }

    if (remove === true){
      handleDeleteFood(mealId, foodIndex, remove, setRemove)
    }
  };

  const handleInputForTarget = (e, mealId) => {
    handleTextChangeForTarget(e, mealId, editing, setMeals1, update_meals1_to_backend);
    if (!editing && !saved) {
      setSaved(true);
    }
  };

  return (
    <MealCard_5
      contentEditable = {true}
      key={mealItem.id}
      name={mealItem.name}
      foodList={mealItem.foods.map((food, index) => (
        <li key={index} contentEditable={editing || !saved} onInput={(e) => handleInput(e, mealItem.id, index)} onFocus={(e) => handleInput(e, mealItem.id, index)}>
          {food}
        </li>
      ))}
      calories={<p contentEditable={editing || !saved} onInput={(e) => handleInputForTarget(e, mealItem.id)} onFocus={(e) => handleInputForTarget(e, mealItem.id)} id ="tg1"  class ="target">{mealItem.totalCalories}</p>}
    />
  );
}

function getDay(i) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return days[i] || "";
}

const currentDayIndex = () => {
  const currentDate = new Date();
  const dayIndex = currentDate.getDay(); 
  return dayIndex - 1;
}


function MealPlan(props){
  const [Meals1, setMeals1] = useState();
  const [TempMeal, setTempMeal] = useState();
  const [day, setDay] = useState(currentDayIndex());
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(true);
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);

  const navigate = useNavigate();
  
  const onSubmit = async (event) => {
      if (!Meals1) {
        alert ("Save meals failed");
        return;
      }

      try {
        const email = window.localStorage.getItem("email");
        const response = await axios.post("http://localhost:4000/meals/save", {email, Meals1});

        if (response.data.success) {
          alert(response.data.message);
          window.localStorage.setItem("mealplan", JSON.stringify(Meals1));
        } else {
          alert(response.data.message);
        }
        
      } catch (err) {
        alert(err);
        console.error("Save meals failed", err);
      }
  };

  const handleClick = (i)=>{
    setDay(i)
  };

  const handleTextChange = (e, mealId, foodIndex, editing, setMeals1, update_meals1_to_backend) => {
      setTempMeal((prevMeals) => {
        const updatedMeals = [...prevMeals];
        if (editing === false){
          updatedMeals[day].meal_info[mealId - 1].foods[foodIndex] = e.target.innerText;
          setMeals1(updatedMeals);
          update_meals1_to_backend();
        }
        return updatedMeals;
      });
  };

  const handleTextChangeForTarget = (e, mealId, editing, setMeals1, update_meals1_to_backend, check) => {
    setTempMeal((prevMeals) => {
      const updatedMeals = [...prevMeals];
      if (editing === false){
        updatedMeals[day].meal_info[mealId - 1].totalCalories = e.target.innerText;
        setMeals1(updatedMeals);
        update_meals1_to_backend()
      }
      return updatedMeals;
    });
  };

  const handleAddFood = (mealId, add, setAdd) => {
      setTempMeal((prevMeals) => {
        const updatedMeals = [...prevMeals];
        if (add === true){
          updatedMeals[day].meal_info[mealId - 1].foods.push("New Food Item");
          setAdd(false);
        }
        return updatedMeals;
      });
  };

  const handleDeleteFood = (mealId, foodIndex, remove, setRemove) => {
    setTempMeal((prevMeals) => {
      const updatedMeals = [...prevMeals];
      if (remove === true){
        updatedMeals[day].meal_info[mealId - 1].foods.splice(foodIndex, 1);
      }
      setRemove(false);
      return updatedMeals;
    });
};

  const handleEditClick = () => {
    setEditing(true);
    setSaved(false);
    setTempMeal([...Meals1])
  };

  const handleSaveClick = () => {
    setEditing(false); 
  };

  const addFoodItem = () => {
    setAdd(true);
  };

  const removeFoodItem = () => {
    setRemove(true);
  };
        
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        // Check if "mealplan" is already set in local storage
        if (!window.localStorage.getItem("mealplan")) {
          var email = window.localStorage.getItem("email");
          const response = await axios.post("http://localhost:4000/meals/mealplan", { email });
          setMeals1(response.data.Meals1);
          setTempMeal([...response.data.Meals1]);
          window.localStorage.setItem("mealplan", JSON.stringify(response.data.Meals1));
        } else {
          const storedMeals = JSON.parse(window.localStorage.getItem("mealplan"));
          setMeals1(storedMeals);
          setTempMeal([...storedMeals]);
          console.log(Meals1);
        }
    } catch (error) {
        console.error("Error fetching meals:", error);
        // Handle the error as needed
    } finally {
      setLoading(false); // Set loading to false whether the request is successful or not
    }
    };

    fetchMeals();
  }, []);

  if (loading) {
    return (
      <div class="home-style row">
        <div class="col-2">
          <SlideBar userType={props.userType} class="col-3" />
        </div>
        <div class ="loading col-10">
          <ClipLoader
          color= "#36d7b7"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"/>
        </div>
    </div>
  );
  }

  const update_meals1_to_backend  = () => {onSubmit();}

  return(
    <div class="home-style row">
        <div class="col-2">
            <SlideBar userType={props.userType} class="col-3" />
        </div>
        <div class="col-5">
            <p class="plan">{getDay(day)}'s plan</p>
            {getDayMeal(Meals1, day).map((mealItem) => createMealCard(update_meals1_to_backend, mealItem,TempMeal, setMeals1, handleTextChange, handleTextChangeForTarget, handleAddFood ,handleDeleteFood, editing, saved, setSaved, add, setAdd, remove, setRemove))}
        </div>
        
        <div class = "col-5 edit-half">
        <button type="button" class="col-12 button-color" id="change" onClick={handleSaveClick} disabled = {saved}>Save</button>
            <div class="d-flex justify-content-center col-12">
                <button type="button" class="button-color"  onClick={addFoodItem} disabled={!editing}>Add</button>
                <button type="button" class="button-color" onClick={handleEditClick} disabled={editing || day < currentDayIndex()}>Edit</button>
                <button type="button" class="button-color" onClick={removeFoodItem} disabled={!editing}>Delete</button>
            </div>
            <ul class="nav nav-pills flex-column align-items-center justify-content-between mb-auto mt-4">
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