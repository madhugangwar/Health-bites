import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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
  const [todayCalories, setTodayCalories] = useState(
    caloriesData[caloriesData.length - 1].calories
  );
  const [foodQuery, setFoodQuery] = useState("");
  const [message, setMessage] = useState("");

  const fetchCalories = async () => {
    if (!foodQuery.trim()) return;

    try {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/nutrition?query=${foodQuery}`,
        {
          headers: {
            "X-Api-Key": "hGKFMxMF/TT6hDc5ncrTvQ==wY8mqX4m9kcCg9P0",
          },
        }
      );
      const data = await res.json();

      if (data.length > 0) {
        const foodCalories = Math.round(data[0].calories);

        const newCal = todayCalories + foodCalories;
        const newData = [
          ...caloriesData.slice(1),
          {
            ...caloriesData[caloriesData.length - 1],
            calories: newCal,
          },
        ];

        setCaloriesData(newData);
        setTodayCalories(newCal);
        setMessage(`✅ ${foodQuery} : ${foodCalories} kcal added`);
      } else {
        setMessage(`⚠️ Couldn't calculate calories for "${foodQuery}"`);
      }
    } catch (error) {
      console.error("Error fetching calories:", error);
      setMessage("⚠️ Error fetching data, please try again.");
    }

    setFoodQuery("");
  };

  return (
    <div className="cal-page">
      <div className="pattern-overlay"></div>

      <div className="content">
        <section className="header-section">
          <h1>Calories Tracker</h1>
          <p>Track your daily and weekly calorie intake</p>
        </section>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter food (e.g. 2 apple, rice, paneer)"
            value={foodQuery}
            onChange={(e) => setFoodQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchCalories()}
          />
          <button onClick={fetchCalories}>Add Food</button>
        </div>

        {message && <p className="message">{message}</p>}

        <div className="glass-card today-calories text-center">
          <h2>Today's Calories</h2>
          <p className="cal-value">{todayCalories} kcal</p>
        </div>

        <div className="glass-card weekly-chart">
          <h2>Weekly Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={caloriesData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="calories"
                stroke="#10B981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default CalTracker;
