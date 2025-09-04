import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "../style/MealPlanner.css";

const initialMeals = [
  { id: 1, name: "Breakfast - Oats", calories: 250 },
  { id: 2, name: "Lunch - Grilled Chicken", calories: 450 },
  { id: 3, name: "Dinner - Salad", calories: 300 },
];

function MealPlanner() {
  const [meals, setMeals] = useState(initialMeals);
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");

  const addMeal = () => {
    if (!mealName || !calories) return;
    setMeals([
      ...meals,
      { id: Date.now(), name: mealName, calories: parseInt(calories) }
    ]);
    setMealName("");
    setCalories("");
  };

  const deleteMeal = (id) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="meal-page px-4 py-5">
      <section className="glassmorphism mb-5 text-center">
        <h1 className="display-5 fw-bold text-success">Meal Planner</h1>
        <p className="lead">Add your meals and track calories!</p>
      </section>

      <div className="glassmorphism mb-5 p-4">
        <div className="d-flex flex-column flex-md-row gap-3">
          <input
            type="text"
            placeholder="Meal Name"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            className="form-control"
          />
          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="form-control"
          />
          <button
            onClick={addMeal}
            className="btn btn-success btn-hover"
          >
            Add Meal
          </button>
        </div>
      </div>

      <div className="glassmorphism mb-5 p-4">
        <h2 className="text-center fw-bold mb-4">Today's Meals</h2>
        <ul className="list-group">
          {meals.map((meal) => (
            <li key={meal.id} className="list-group-item d-flex justify-content-between align-items-center shadow-sm">
              <span className="fw-medium">{meal.name} - {meal.calories} kcal</span>
              <button
                onClick={() => deleteMeal(meal.id)}
                className="btn btn-danger btn-sm"
                style={{
                  backgroundColor: "#ef4444",
                  border: "none",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "8px",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#dc2626"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#ef4444"}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <p className="total-calories mt-3 text-center fw-bold fs-5">
          Total Calories: {totalCalories} kcal
        </p>
      </div>
      <div className="glassmorphism p-4">
        <h2 className="text-center fw-bold mb-4">Weekly Summary</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={meals}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="calories" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MealPlanner;
