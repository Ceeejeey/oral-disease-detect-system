
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import '../styles/global.css';

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", age: "", gender: "", location: "",
    password: "", confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }

    // Save user email in localStorage
    localStorage.setItem("userEmail", formData.email);

    // Optionally log the user in after signup
    login({
      name: formData.name,
      email: formData.email
    });

    navigate("/dashboard");
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit}>
        <h2>Create an Account</h2>

        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} value={formData.name} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} value={formData.phone} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} value={formData.age} required />
        
        <select name="gender" onChange={handleChange} value={formData.gender} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input type="text" name="location" placeholder="Location" onChange={handleChange} value={formData.location} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={formData.confirmPassword} required />

        <button type="submit">Sign Up</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}




