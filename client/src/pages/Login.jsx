
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../styles/global.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fakeUser = {
      email: formData.email,
      name: "John Doe"
    };

 
    localStorage.setItem("userEmail", formData.email);


    login(fakeUser);

    navigate("/dashboard");
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
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
        <p className="form-switch-text">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
