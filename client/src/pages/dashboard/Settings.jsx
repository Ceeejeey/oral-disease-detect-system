
import React, { useState, useEffect } from "react";
import "../../styles/global.css";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    location: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    setProfile({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      age: user.age || "",
      gender: user.gender || "",
      location: user.location || "",
    });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(profile));
    alert("✅ Profile updated successfully!");
  };

  return (
    <div className="settings-container">
      <h2>User Settings</h2>

      <form className="settings-form">
        <label>
          Full Name:
          <input type="text" name="name" value={profile.name} onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={profile.email} disabled />
        </label>

        <label>
          Phone Number:
          <input type="tel" name="phone" value={profile.phone} onChange={handleChange} />
        </label>

        <label>
          Age:
          <input type="number" name="age" value={profile.age} onChange={handleChange} />
        </label>

        <label>
          Gender:
          <select name="gender" value={profile.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Location:
          <input type="text" name="location" value={profile.location} onChange={handleChange} />
        </label>

        <button type="button" onClick={handleSave}>Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;
