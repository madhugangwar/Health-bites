import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../style/Navbar.css'

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); 
    navigate("/login"); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3 text-success" to="/">
          Health Bites
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/recipes">
                Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/meal-planner">
                Meal Planner
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/calories-tracker">
                Calories Tracker
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/articles">
                Articles
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item ms-lg-3">
              <button
                onClick={handleLogout}
                className="btn btn-danger px-3 py-1 rounded-3"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
