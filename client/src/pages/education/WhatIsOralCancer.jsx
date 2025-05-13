import React from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles/global.css";

const WhatIsOralCancer = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="education-detail">
      <h1>🦷 What is Oral Cancer?</h1>

      <Section title="📌 Definition">
        Oral cancer refers to a group of cancers that begin in the mouth or throat. It can occur on the lips, tongue, gums, inner cheeks, floor or roof of the mouth, and even the back of the throat. These cancers most often originate in the squamous cells that line the mouth.
      </Section>

      <Section title="🔍 Causes and Risk Factors">
        Several factors contribute to the development of oral cancer, including tobacco use (smoking and chewing), heavy alcohol consumption, human papillomavirus (HPV) infection, sun exposure (especially to the lips), poor oral hygiene, and a weakened immune system.
      </Section>

      <Section title="🧭 Areas Commonly Affected">
        Oral cancer may develop in various parts of the mouth:
        <ul>
          <li>🦷 Lips (especially lower lip)</li>
          <li>🦷 Sides and underside of the tongue</li>
          <li>🦷 Gums and inner cheeks</li>
          <li>🦷 Floor and roof of the mouth</li>
          <li>🦷 Oropharynx (throat and tonsils)</li>
        </ul>
      </Section>

      <Section title="🚨 Why Early Detection Matters">
        Like many cancers, oral cancer is most treatable when caught early. Unfortunately, it often starts silently and may be mistaken for common sores or irritation. Delays in diagnosis can lead to complications and reduce the chances of successful treatment.
      </Section>

      <Section title="✅ Take Action">
        Be proactive. Perform regular self-checks, visit your dentist for routine exams, and use tools like our AI-based screening system to detect potential issues early. Avoiding tobacco, moderating alcohol, and maintaining good oral hygiene also lower your risk.
      </Section>

      <div className="button-right">
        <button className="back-button" onClick={handleGoBack}>Back</button>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-5">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-700">{children}</p>
  </div>
);

export default WhatIsOralCancer;

