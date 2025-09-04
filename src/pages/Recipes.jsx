import React, { useState } from "react";
import "../style/Recipes.css";

const Recipes = () => {
  const [favorites, setFavorites] = useState([]);

  const recipes = [
    {
      id: 1,
      title: "Oats with Fruits",
      description: "A healthy mix of oats, milk, and seasonal fruits.",
      image:
        "https://plus.unsplash.com/premium_photo-1691948105759-b4729bc98bed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBvcnJpZGdlfGVufDB8fDB8fHww",
    },
    {
      id: 2,
      title: "Green Salad",
      description: "Fresh veggies with olive oil dressing for detox.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0bysUxWfmP1WAnVO4Z90ph_o44bfMrcD6Hw&s"
    },
    {
      id: 3,
      title: "Smoothie Bowl",
      description: "Banana and berries blended with yogurt, topped with seeds.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const toggleFavorite = (recipe) => {
    if (favorites.find((fav) => fav.id === recipe.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== recipe.id));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  return (
    <div className="recipes-page">
      <header className="recipes-header">
        <h1>Healthy Recipes</h1>
        <p>Nutritious, tasty & easy-to-make meals for your lifestyle</p>
      </header>

      <section className="recipes-section container">
        <div className="row">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4 col-sm-6 mb-4">
              <div className="card card-hover h-100">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">{recipe.description}</p>
                  <button
                    className={`btn ${
                      favorites.find((fav) => fav.id === recipe.id)
                        ? "btn-danger"
                        : "btn-success"
                    } btn-hover`}
                    onClick={() => toggleFavorite(recipe)}
                  >
                    {favorites.find((fav) => fav.id === recipe.id)
                      ? "Remove Favorite"
                      : "Add to Favorites"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {favorites.length > 0 && (
        <section className="favorites-section container mt-5">
          <h2 className="text-center mb-4">Your Favorite Recipes</h2>
          <div className="row">
            {favorites.map((fav) => (
              <div key={fav.id} className="col-md-3 col-sm-6 mb-3">
                <div className="card">
                  <img
                    src={fav.image}
                    alt={fav.title}
                    className="card-img-top"
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title">{fav.title}</h6>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => toggleFavorite(fav)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Recipes;
