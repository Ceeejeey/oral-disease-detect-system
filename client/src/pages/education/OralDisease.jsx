
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/global.css";

const OralDisease = () => {
    const navigate = useNavigate();
      
        const handleGoBack = () => {
          navigate(-1); 
        };
  return (
    <div className="education-detail">
      <h1>🦷 What is Oral Disease?</h1>
      <p >
      Oral diseases refer to a range of conditions that affect the health of the mouth, teeth, gums, and surrounding tissues. These conditions can be caused by poor oral hygiene, bacterial infections, dietary habits, genetic predispositions, or systemic health issues. If left untreated, oral diseases can lead to pain, tooth loss, speech difficulties, and complications that extend to overall health.
      <br /><br />
      Our AI model is trained to identify and differentiate several common oral diseases from images. Here's what we currently detect:
      
      </p>

      <Section title="🦠 Calculus (Tartar)">
      Calculus, or tartar, is hardened dental plaque that forms on the teeth and gums when plaque isn’t removed by brushing or flossing. 
      It can lead to gum irritation, recession, and more severe forms of gum disease. Calculus often appears as yellow or brown deposits along the gumline.
      </Section>

      <Section title="🦷 Dental Caries (Tooth Decay)">
      Dental caries are permanently damaged areas in the enamel or dentin that develop into tiny holes or cavities. They are caused by bacterial activity and the consumption of sugary foods or drinks. If not treated, caries can progress into deep cavities requiring fillings or extractions.
      </Section>

      <Section title="🩸 Gingivitis">
      Gingivitis is the early stage of gum disease, characterized by red, swollen, and bleeding gums. It is reversible with good oral hygiene and professional care. Gingivitis is commonly caused by the buildup of plaque and poor dental cleaning habits.
      </Section>

      <Section title="❌ Hypodontia">
      Hypodontia is a developmental condition where one or more teeth are missing due to congenital reasons. It most commonly affects permanent teeth like lateral incisors or premolars. Early diagnosis is important for orthodontic or prosthetic planning.


      </Section>

      <Section title="😣 Mouth Ulcer">
      Mouth ulcers are small, painful lesions that develop in the mouth or at the base of the gums. They are typically round or oval with a white or yellow center and a red border. Causes include stress, trauma, or certain medical conditions. Persistent ulcers may require clinical investigation.
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

export default OralDisease;