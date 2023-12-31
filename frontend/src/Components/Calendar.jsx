import React, {useState, useEffect} from 'react';
import "../CSS/Calendar.css"

function Calendar(){
    const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); 

    return () => clearInterval(intervalId); 
  }, []);

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

   const getStartOfWeek = (date) => {
    const dayOfWeek = date.getDay();
    const difference = date.getDate() - dayOfWeek;
    return new Date(date.setDate(difference));
  };

  const startOfWeek = getStartOfWeek(new Date(currentDate));

  const daysInWeek = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    daysInWeek.push(day.getDate());
  }

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri","Sat"]

  const [day, setDay] = useState(0);

    const handleClick = (i)=>{
      setDay(i)
    };

  return (
    <div>
      <p class="date">{formattedDate}</p>
      <div className="numeric-days-container">
        {days.map((dayItem, index) => (
          <div key={index} className="numeric-day-item">
            <div class = "day-item">
                {dayItem}
            </div>
          </div>
        ))}
      </div>
      <div className="numeric-days-container">
        {daysInWeek.map((dayItem, index) => (
          <div key={index} className="numeric-day-item">
            <a type='button' onClick={() => handleClick(index)} className = {`day-item nav-link link-body-emphasis ${day === index ? 'active' : ''}`}>
                {dayItem}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar