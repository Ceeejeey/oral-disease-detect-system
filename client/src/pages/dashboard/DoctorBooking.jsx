
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/global.css";

const DoctorBooking = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleBooking = (e) => {
    e.preventDefault();

    
    const newAppointment = {
      doctor: doctorId.replace("-", " "),
      date: selectedDate,
      time: selectedTime,
    };

    const existingAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const updatedAppointments = [...existingAppointments, newAppointment];
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

    alert("Appointment booked successfully!");

   
    navigate("/dashboard");
  };

  return (
    <div className="booking-container">
      <h2>Book Appointment with Dr. {doctorId.replace("-", " ")}</h2>

      <div className="doctor-info">
        <p><strong>Specialty:</strong> Oral Oncology</p>
        <p><strong>Location:</strong> City Clinic, Health Avenue</p>
        <p><strong>Available Days:</strong> Mon - Fri</p>
      </div>

      <form onSubmit={handleBooking} className="booking-form">
        <label>
          Select Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </label>
        <label>
          Select Time:
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
          >
            <option value="">--Select Time--</option>
            <option>10:00 AM</option>
            <option>12:00 PM</option>
            <option>2:00 PM</option>
            <option>4:00 PM</option>
          </select>
        </label>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default DoctorBooking;
