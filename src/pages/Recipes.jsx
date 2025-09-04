import React, { useState } from "react";
import "../style/Recipes.css";

const Recipes = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRecipes = async (customQuery) => {
    const searchTerm = customQuery || query;
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=12&addRecipeInformation=true&apiKey=e0bfd6fcd6874f9abdb1702029eb6d14`
      );
      const data = await res.json();
      setRecipes(data.results || []);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (recipe) => {
    if (favorites.find((fav) => fav.id === recipe.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== recipe.id));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  const quickSearchItems = [
    "Paneer",
    "Lentils",
    "Chickpeas",
    "Biryani",
    "Samosa",
    "Pakora",
    "Chaat",
    "Dosa",
    "Idli",
    "Spinach",
    "Cauliflower",
    "Okra",
    "Potato"
  ];

  const handleQuickSearch = (item) => {
    setQuery(item);
    searchRecipes(item);
  };

  return (
    <div className="recipes-page">
      <header className="recipes-header">
        <h1>Healthy Recipes</h1>
        <p>Nutritious, tasty & easy-to-make meals for your lifestyle</p>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a recipe (e.g. chicken, salad)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchRecipes()}
        />
        <button onClick={() => searchRecipes()}>Search</button>
      </div>

      <div className="quick-search container">
        <h4>🍴 Quick Picks</h4>
        <div className="quick-buttons">
          {quickSearchItems.map((item) => (
            <button
              key={item}
              className="quick-btn"
              onClick={() => handleQuickSearch(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <section className="recipes-section container">
        <div className="row">
          {loading ? (
            <p>Loading recipes...</p>
          ) : (
            recipes.map((recipe) => (
              <div key={recipe.id} className="col-md-4 col-sm-6 mb-4">
                <div className="card card-hover h-100">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="card-img-top"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{recipe.title}</h5>
                    <p className="card-text">
                      {recipe.readyInMinutes} mins | {recipe.servings} servings
                    </p>
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
            ))
          )}
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
