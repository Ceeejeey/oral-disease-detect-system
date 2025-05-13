import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/global.css";

const EarlyWarningSigns = () => {
  const navigate = useNavigate();
  
    const handleGoBack = () => {
      navigate(-1); // go to previous page
    };
  return (
    <div className="education-detail">
      <h1>🧠 Early Warning Signs</h1>
      <p>
        Oral cancer often starts silently, which is why paying close attention to the early signs can be lifesaving. By knowing what to look for, you can catch problems early—when treatment is most effective. These symptoms might appear anywhere in the mouth, including the tongue, cheeks, lips, gums, or throat.
      </p>

      
        <Section title="🔴 Persistent Sores">
        A sore or ulcer that does <strong>not heal within 2–3 weeks</strong>. May appear red, white, or mixed in color. Can be painful or completely painless.
        </Section>
      

      <Section title="🟠 Lumps or Thickened Tissue">
        Any <strong>lump, bump, or area of thickened skin</strong> inside your mouth, on your lips, or under your tongue. May feel firm or rough to the touch.
      </Section>

      <Section title="⚪ White or Red Patches">
      <strong>Leukoplakia (white patches)</strong> or <strong>erythroplakia (red patches)</strong> that do not rub off. These may appear flat or slightly raised.
      </Section>

      <Section title="🗣️ Changes in Speech or Voice">
        Difficulty speaking clearly. Hoarseness or a sore throat that persists.
        </Section>

      <Section title="😮 Difficulty Swallowing or Chewing">
       Feeling of something stuck in your throat. Pain while chewing or swallowing. Numbness in the tongue or other parts of the mouth.
     </Section>

      <Section title="🦷 Loose Teeth or Denture Fit Changes">
       A tooth that becomes loose without clear reason. Dentures suddenly feeling uncomfortable or not fitting properly.
        </Section>

      <Section title="👅 Numbness or Unusual Sensations">
        Numbness in the lips, tongue, chin, or face. Tingling or burning sensations.
      </Section>

      <Section title="📝 When to Take Action">
        If you notice <strong>one or more of these symptoms lasting longer than 2–3 weeks</strong>, it’s important to consult a dentist or doctor. Even if they seem mild or painless, don’t ignore them. Early diagnosis can significantly improve outcomes and may even save your life.
        Regular self-checks and awareness are key to staying safe and healthy.
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

export default EarlyWarningSigns;
