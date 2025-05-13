import React from "react";
import { Link } from "react-router-dom";

const EducationCard = ({ icon, title, description, link }) => {
  return (
    <div className="edu-card">
      <div className="edu-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link} className="read-more-btn">Read More</Link>
    </div>
  );
};

export default EducationCard;
