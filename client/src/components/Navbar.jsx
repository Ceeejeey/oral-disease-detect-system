import React from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import "../styles/global.css";

function Navbar() {
  const { user, logout } = useAuth(); 
  const location = useLocation();   
  const navigate = useNavigate();
  

  const handleLogout = () => {
    logout();            // clear user + tokens
    navigate("/");       // redirect to home
  };

  console.log("user in Navbar:", user); // Debugging line
  const isActive = (path) => (location.pathname === path ? "active-link" : "");
  
  return (
    <header>
     
      <div className="top-bar">
        <p>✉️ info@smilesafe.ai</p>
      </div>

      
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/logo2.png" alt="SmileSafe.ai Logo" className="logo-img" />
          </Link>
          <span className="navbar-title">
            <span className="highlight">Smile</span>Safe.ai
          </span>
        </div>
        <ul className="navbar-links">
          <li className={isActive("/") ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
         
          <li className={isActive("/education") ? "active" : ""}>
            <Link to="/education">Education Section</Link>
          </li>

          {user ? (
            <>
              <li className={isActive("/dashboard") ? "active" : ""}>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className={isActive("/login") ? "active" : ""}>
                <Link to="/login">Login</Link>
              </li>
              <li className={isActive("/signup") ? "active" : ""}>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;