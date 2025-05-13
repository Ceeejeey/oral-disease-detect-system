import React from "react";
import "../styles/global.css";
import aboutImage from "../assets/image3.jpeg"; 

function About() {
  return (
    <section className="about-section new-about">
      <div className="about-container">
        <div className="about-image-wrapper">
          <img src={aboutImage} alt="About us" className="about-image" />
        </div>
        <div className="about-content">
          <h4 className="about-subtitle">About Us</h4>
          <h2 className="about-title">
            Revolutionizing Oral Health with AI Detection
          </h2>
          <p>
            SmileSafe.ai is on a mission to revolutionize early detection of oral cancer and other
            oral diseases using advanced AI technology. Our platform empowers individuals to take control of
            their oral health through quick, secure, and accurate image-based diagnostics.
          </p>
          <p>
            We believe that prevention and early diagnosis can save lives. By combining modern image processing
            with clinical insight, we aim to bridge the gap between awareness and action—especially in communities
            with limited access to healthcare.
          </p>
          
        </div>
      </div>
    </section>
  );
}

export default About;


