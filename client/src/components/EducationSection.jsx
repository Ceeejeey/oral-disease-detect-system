
import React from "react";
import EducationCard from "./EducationCard";
import { FaTeeth, FaSearch, FaVials } from "react-icons/fa";
import "../styles/global.css";

const EducationSection = () => {
  const topics = [
  
    {
        icon: "🦷",
        title: "What is Oral Cancer?",
        description: "Learn about oral cancer, how it starts, and which areas of the mouth it commonly affects.",
        link: "/education/what-is-oral-cancer"
    
    },
      {
        icon: "🔬",
        title: "Early Warning Signs",
        description: "Identify the symptoms like persistent sores, lumps, or patches that may need medical attention.",
      link: "/education/early-detection"
    },
      {
        icon: "📸",
        title: "How to Check at Home",
        description: "Use your phone camera and our AI tool to screen for potential signs of oral issues quickly.",
       link: "/education/check-at-home"
    },
    {
      icon: "👨‍⚕️",
      title: "What is Oral Disease ?",
      description: "Understand when it's time to consult a professional for further diagnosis or treatment.",
    link: "/education/oral-disease"
  },
      {
        icon: "🍏",
        title: "Oral Health Tips",
        description: "Discover daily habits that support oral hygiene and help prevent oral diseases.",
      link: "/education/health-tips"
    },
     
      {
        icon: "💡",
        title: "Did You Know?",
        description: "Fact: Early detection of oral cancer boosts survival chances by 80%. Stay informed!",
      link: "/education/facts"
    },




  ];

  return (
    <div className="edu">
    <div className="edu-section">
      {topics.map((item, idx) => (
        <EducationCard key={idx} {...item} />
      ))}
    </div>
    </div>
  );
};

export default EducationSection;
