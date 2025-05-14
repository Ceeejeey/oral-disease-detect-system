import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/global.css";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = "http://localhost:8000/api/login"; // Adjusted to the correct endpoint

    try {
      const response = await axios.post(API_URL, {
        email: formData.email,
        password: formData.password
      });

      if (response.status === 200) {
        const { access_token, token_type } = response.data;

        // Save token to localStorage
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("tokenType", token_type);

        alert("✅ Login successful!");
        navigate("/dashboard");  // Redirect to dashboard or homepage
      }

    } catch (error) {
      console.error("Login Error:", error);

      if (error.response && error.response.data) {
        setError(error.response.data.detail);
      } else {
        setError("❌ An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <div className="error-msg">{error}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
        />

        <button type="submit">Login</button>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
