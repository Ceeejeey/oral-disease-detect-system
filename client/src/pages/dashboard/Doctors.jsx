import React from "react";
import { Link } from "react-router-dom";
import "../../styles/global.css";
import doctor1 from "../../assets/doctorimage1.jpg";
import doctor2 from "../../assets/doctorimage2.jpg";
import doctor3 from "../../assets/doctorimage3.jpg";


const doctors = [
  {
    id: "dr-ahuja",
    name: "Dr. Ahuja",
    specialty: "Oral Oncologist",
    clinic: "Smile Care Clinic",
    location: "Trincomalee",
    image: doctor1,
  },
  {
    id: "dr-perera",
    name: "Dr. Perera",
    specialty: "Dental Surgeon",
    clinic: "Bright Smiles Dental",
    location: "Kandy",
    image: doctor2,
  },
  {
    id: "dr-silva",
    name: "Dr. Silva",
    specialty: "Oral Pathologist",
    clinic: "Healthy Mouth Center",
    location: "Colombo",
    image: doctor3,
  },
];

const Doctors = () => {
  return (
    <div className="doctors-page">
      <h1>Our Trusted Doctors</h1>
      <div className="doctor-grid">
        {doctors.map((doctor) => (
          <Link key={doctor.id} to={`/dashboard/doctors/${doctor.id}`} className="doctor-card">
            <img src={doctor.image} alt={doctor.name} className="doctor-img" />
            <h3>{doctor.name}</h3>
            <p>{doctor.specialty}</p>
            <p>{doctor.clinic}</p>
            <p>{doctor.location}</p>
            <button className="book-btn">Book Appointment</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
