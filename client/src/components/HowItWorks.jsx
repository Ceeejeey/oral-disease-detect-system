import React from 'react';
import '../styles/global.css';
import uploadIcon from '../assets/icons/upload.png';
import analysisIcon from '../assets/icons/ai-analysis.png';
import reportIcon from '../assets/icons/report.png';
import doctorIcon from '../assets/icons/doctor.png';

const HowItWorks = () => {
  const steps = [
    {
      icon: uploadIcon,
      title: '1. Upload Image',
      description: 'Upload a clear photo of your mouth or affected area for analysis.',
    },
    {
      icon: analysisIcon,
      title: '2. AI Analysis',
      description: 'Our AI scans the image to detect signs of oral cancer or related diseases.',
    },
    {
      icon: reportIcon,
      title: '3. View Results',
      description: 'Get a quick, easy-to-understand health report in seconds.',
    },
    {
      icon: doctorIcon,
      title: '4. Consult a Doctor',
      description: 'If needed, connect with a specialist for further evaluation.',
    },
  ];

  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="how-it-works-steps">
        {steps.map((step, index) => (
          <div className="how-step" key={index}>
            <img src={step.icon} alt={step.title} className="how-icon" />
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
