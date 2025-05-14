import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/global.css";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",  // Updated to match FastAPI
    age: "",
    gender: "",
    location: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = "http://localhost:8000/api/signup"; // Adjusted to the correct endpoint

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        name: formData.name,
        email: formData.email,
        telephone: formData.telephone,  // Corrected field name
        age: parseInt(formData.age),   // Convert age to integer
        gender: formData.gender,
        location: formData.location,
        password: formData.password,
      });

      if (response.status === 201) {
        alert("✅ Signup successful! You can now login.");
        navigate("/login");
      }

    } catch (error) {
      console.error("Signup Error:", error);

      if (error.response && error.response.data) {
        alert(`❌ ${error.response.data.detail}`);
      } else {
        alert("❌ An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit}>
        <h2>Create an Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          value={formData.name}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />

        <input
          type="tel"
          name="telephone"   // Updated to match the FastAPI model
          placeholder="Phone Number"
          onChange={handleChange}
          value={formData.telephone}
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          value={formData.age}
          required
        />

        <select
          name="gender"
          onChange={handleChange}
          value={formData.gender}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          value={formData.location}
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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={formData.confirmPassword}
          required
        />

        <button type="submit">Sign Up</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
