import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "../style/CalTracker.css";

const initialData = [
  { day: "Mon", calories: 1200 },
  { day: "Tue", calories: 1500 },
  { day: "Wed", calories: 1300 },
  { day: "Thu", calories: 1400 },
  { day: "Fri", calories: 1250 },
  { day: "Sat", calories: 1600 },
  { day: "Sun", calories: 1350 },
];

function CalTracker() {
  const [caloriesData, setCaloriesData] = useState(initialData);
  const [todayCalories, setTodayCalories] = useState(caloriesData[caloriesData.length - 1].calories);

  const addCalories = () => {
    const newCal = Math.floor(Math.random() * 500) + 1000;
    const newData = [...caloriesData.slice(1), { ...caloriesData[caloriesData.length - 1], calories: newCal }];
    setCaloriesData(newData);
    setTodayCalories(newCal);
  };

  return (
    <div className="cal-page">
      <div className="pattern-overlay"></div>

      <div className="content">
        <section className="header-section">
          <h1>Calories Tracker</h1>
          <p>Track your daily and weekly calorie intake</p>
        </section>


        <div className="glass-card today-calories text-center">
          <h2>Today's Calories</h2>
          <p className="cal-value">{todayCalories} kcal</p>
          <button className="btn-hover" onClick={addCalories}>
            Add Random Calories
          </button>
        </div>

        <div className="glass-card weekly-chart">
          <h2>Weekly Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={caloriesData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="calories" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default CalTracker;
