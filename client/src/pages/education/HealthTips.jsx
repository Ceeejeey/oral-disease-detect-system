import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/global.css";

const HealthTips = () => {
    
    const navigate = useNavigate();
  
    const handleGoBack = () => {
      navigate(-1); // go to previous page
    };

  return (
    <div className="education-detail">
          
      <h1 >🍏 Oral Health Tips</h1>
      <p >
        A healthy smile starts with daily care. Maintaining good oral hygiene doesn’t just help prevent cavities and bad breath—it also plays a major role in preventing more serious conditions like gum disease and even oral cancer. Follow these essential tips to keep your mouth fresh, clean, and healthy.
      </p>

      <Section title="🪥 Brush Twice a Day">
        <p>Brush your teeth every morning and before bed using fluoride toothpaste. Use a soft-bristled brush and gentle circular motions to clean all surfaces of your teeth for at least two minutes.</p>
        </Section>

        <Section title= "🧵 Floss Daily">
        <p>Flossing removes plaque and food particles stuck between teeth where your toothbrush can’t reach. Make flossing a daily habit to keep gums healthy and prevent cavities.</p>
        </Section>

      <Section title="🧴 Use Mouthwash">
        <p>Antibacterial or fluoride mouthwash helps reduce bacteria, freshen breath, and protect your enamel. Use it after brushing or in the middle of the day for a quick oral refresh.</p>
        </Section>

      <Section title="🥦 Eat a Balanced Diet ">
        <p>Avoid sugary snacks and drinks which can lead to tooth decay. Instead, include plenty of fruits, vegetables, calcium-rich foods, and water to support strong teeth and gums.</p>
        </Section>

      <Section title="🚭 Avoid Tobacco Products  ">
        <p>Smoking and chewing tobacco significantly increase your risk of oral cancer and gum disease. Quitting tobacco is one of the best things you can do for your oral and overall health.</p>
        </Section>

      <Section title="🦷 Visit Your Dentist Regularly ">
        <p>Get a dental check-up and cleaning every 6 months. Regular visits help detect early signs of issues and keep your smile in top shape.</p>
        </Section>

      <Section title="🌟 Make Oral Care a Lifestyle ">
        <p>Good oral hygiene is a lifelong commitment. Build these habits into your daily routine to enjoy a brighter, healthier smile—and lower your risk of oral diseases, including oral cancer.</p>
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
  


export default HealthTips;


