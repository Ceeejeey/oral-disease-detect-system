import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/global.css";

const CheckAtHome = () => {
    const navigate = useNavigate();
      
        const handleGoBack = () => {
          navigate(-1); // go to previous page
        };
  return (
    <div className="education-detail">
      <h1>📸 How to Check at Home</h1>
      <p >
        Checking your mouth regularly at home is a simple but powerful way to catch early signs of oral cancer or other issues. 
        It only takes a few minutes and can be done using a mirror, clean hands, and a well-lit room. Here’s how to perform a complete self-exam:
      </p>

      <Section title="🧑‍🦰 Face">
        Look closely at your entire face in the mirror. Check for any unusual swellings or changes in skin texture. 
        Have any moles changed in size, shape, or started to itch or bleed? Turn your head side to side to stretch the skin—this makes lumps or irregularities easier to notice.
      </Section>

      <Section title="🧠 Neck">
        Run your fingers along your jawline and down both sides of your neck using the pads of your fingers. 
        Feel along the large muscles on each side. Is everything symmetrical? Any lumps, tenderness, or unusual swelling could be worth checking out.
      </Section>

      <Section title="👄 Lips">
        Use your index and middle fingers along with your thumb to feel inside your lips. Pull the upper lip upward and lower lip downward 
        to inspect the inner tissue. Look for any sores, discoloration, or irregular bumps. Gently press and feel for changes in texture or firmness.
      </Section>

      <Section title="🦷 Gums">
        Use both your thumb and forefinger to feel along the inside and outside of your gums. Move around the full gum line. 
        You're checking for swelling, tenderness, hard areas, or anything that feels out of the ordinary.
      </Section>

      <Section title="😊 Cheeks">
        Open your mouth wide and pull your cheek outward one side at a time. Look inside for red, white, or dark patches. 
        With a clean finger, gently press inside the cheek to check for lumps, ulcers, or sore spots. Repeat on the other side. 
        Your tongue can help you feel sensitive or rough areas too.
      </Section>

      <Section title="👅 Tongue">
        Stick out your tongue and inspect the top, sides, and underside. Check for discoloration, swelling, or ulcers. 
        Gently grasp the tip of your tongue with gauze or tissue to look underneath by lifting it toward the roof of your mouth. 
        Don’t forget to feel for firmness or lumps along the sides.
      </Section>

      <Section title="👅 Floor of the Mouth">
        Lift your tongue to expose the floor of your mouth. Look carefully for changes in color or surface texture. 
        Gently press the area beneath your tongue with a clean finger to check for lumps, tenderness, or swelling.
      </Section>

      <Section title="🏠 Roof of the Mouth">
        Tilt your head back and open wide. Use a mirror and light to inspect the roof of your mouth. 
        Check for any ulcers, discoloration, or texture changes. Use your finger to feel along the area if needed.
      </Section>

      <div className="mt-6 p-4 border-l-4 border-yellow-500 bg-yellow-100 text-yellow-800">
        <strong>📝 Note:</strong> Minor issues like sores from biting, burning, or a cold typically heal within 2–3 weeks. 
        If you notice anything unusual that doesn't improve or gets worse, it’s important to see your dentist or doctor. 
        Early attention can make a big difference.
      </div>
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

export default CheckAtHome;

