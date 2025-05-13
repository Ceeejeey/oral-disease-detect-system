import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/global.css";

const DidYouKnow = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1); // go to previous page
  };

  return (
    <div className="education-detail">
      <h1>💡 Did You Know?</h1>
      <p>
        These quick facts offer valuable insights about oral cancer and related diseases—what causes them, how common they are, and why early detection is essential.
      </p>

      <Section title="📈 Oral Cancer Survival Boost">
        Detecting oral cancer <strong>early boosts survival chances by up to 80%</strong>. Regular checks can help save lives.
      </Section>

      <Section title="🚬 Smoking & Alcohol Multiply Risk">
        Smoking or alcohol use alone raises cancer risk. <strong>Using both increases it exponentially</strong>, making oral cancer more likely.
      </Section>

      <Section title="🦠 HPV Is a Leading Cause">
        <strong>HPV (Human Papillomavirus)</strong> is now one of the primary causes of oral cancer, especially in younger non-smoking adults.
      </Section>

      <Section title="🔴 Red or White Patches Matter">
        Red (erythroplakia) or white (leukoplakia) patches in the mouth that <strong>don’t heal in 2–3 weeks</strong> may signal early cancer.
      </Section>

      <Section title="🌍 Over 3 Billion Affected">
        Around <strong>3.5 billion people worldwide</strong> are impacted by oral diseases—many are preventable with simple hygiene habits.
      </Section>

      <Section title="🪥 9 in 10 Adults Get Cavities">
        <strong>More than 90%</strong> of adults develop cavities in their lifetime. Brushing, flossing, and reducing sugar can help prevent them.
      </Section>

      <Section title="👨‍⚕️ Gum Disease Is Reversible">
        <strong>Gingivitis</strong>, the early stage of gum disease, is often reversible with better brushing and professional cleanings.
      </Section>

      <Section title="⏱️ Ulcers That Linger">
        Mouth ulcers that last <strong>more than 3 weeks</strong> should be checked by a doctor—they may not be just a minor irritation.
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

export default DidYouKnow;
