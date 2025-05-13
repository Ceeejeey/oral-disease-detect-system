import React from 'react';
import '../styles/global.css';
import logo from '../assets/logo.png'; 
import OralCancerStats from '../components/OralCancerStat';
import About from '../components/About';
import EducationSection from '../components/EducationSection';
import Footer from '../components/Footer';
import HowItWorks from '../components/HowItWorks';

function LandingPage() {
  return (
    <div className="landing">
      <header className="landing-header">
        <nav className="landing-nav">
         
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>AI-Powered Oral Cancer Detection</h1>
          <p className="hero-subtitle">
            Take control of your oral health with cutting-edge image analysis.<br />
            Quick, accurate, and accessible — anytime, anywhere.
          </p>

          <ul className="hero-features">
            <li>⚡ Instant results using advanced AI</li>
            <li>🔍 Detect cancer and common oral diseases</li>
            <li>📞 Connect with verified dental specialists</li>
            <li>📚 Access expert-backed oral health education</li>
          </ul>

          <div className="hero-buttons">
            <a href="/upload">
              <button className="hero-button">Upload an Image</button>
            </a>
            <a href="/signup">
              <button className="get-started-button">Get Started</button>
            </a>
          </div>
        </div>
      </section>

      <HowItWorks />

      <OralCancerStats />
      <About />

      <section className="education-section">
        <h2>Learn About Oral Cancer</h2>
        <EducationSection />
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
