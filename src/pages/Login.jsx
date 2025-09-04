import React, { useState } from "react";
import "../style/Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name: email.split("@")[0], email };
    localStorage.setItem("user", JSON.stringify(userData));
    onLogin(userData);
  };

  const handleForgotPassword = () => {
    if (!email) return alert("Enter your email to reset password.");
    alert(`Password reset link sent to ${email}`);
  };

  const handleGoogleLogin = () => {
    const userData = { name: "Google User", email: "googleuser@gmail.com" };
    localStorage.setItem("user", JSON.stringify(userData));
    onLogin(userData);
  };

  const handleSwiggyLogin = () => {
    const userData = { name: "Swiggy User", email: "swiggyuser@gmail.com" };
    localStorage.setItem("user", JSON.stringify(userData));
    onLogin(userData);
  };

  return (
    <div className="login-page">
      {["🍎","🥦","🍳","🍇","🥑"].map((icon, idx) => (
        <span
          key={idx}
          className="food-icon"
          style={{
            left: `${10 + idx * 18}%`,
            animationDuration: `${10 + idx * 2}s`,
          }}
        >
          {icon}
        </span>
      ))}

      <div className="login-container d-flex justify-content-center align-items-center">
        <div className="login-box glassmorphism text-center p-5 animate-slideUp">
          <h1 className="mb-3">🌱 Health Bites</h1>
          <p className="mb-4">Sign in to continue your wellness journey</p>

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <input
              type="email"
              placeholder="Email Address"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle position-absolute top-50 end-0 translate-middle-y pe-3"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button type="submit" className="btn btn-success btn-hover">
              Sign In
            </button>
          </form>

          <p className="mt-2">
            <button
              onClick={handleForgotPassword}
              className="btn btn-link p-0 text-decoration-none"
            >
              Forgot Password?
            </button>
          </p>

          <div className="d-flex flex-column gap-2 mt-3">
            <button onClick={handleGoogleLogin} className="btn btn-outline-primary">
              Continue with Google
            </button>
            <button onClick={handleSwiggyLogin} className="btn btn-outline-warning">
              Continue with Swiggy
            </button>
          </div>

          <p className="mt-3">
            Don't have an account? <a href="/signup">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
