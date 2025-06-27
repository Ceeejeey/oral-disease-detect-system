import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import jsPDF from "jspdf";
import "../styles/global.css";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { prediction, confidence, imageName } = location.state || {};

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Oral Health Analysis Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 35);
    doc.text(`Analyzed Image: ${imageName}`, 20, 45);
    doc.text(`Prediction: ${prediction}`, 20, 55);
    doc.text(`Confidence: ${(confidence * 100).toFixed(2)}%`, 20, 65);
    doc.save("oral-health-report.pdf");
  };

  const handleProtectedNavigate = (path) => {
    if (!user) {
      alert("Please log in to continue.");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  if (!prediction) {
    return (
      <div className="result-container">
        <h2>No Result Found</h2>
        <button onClick={() => navigate("/upload")} className="upload-button">
          Upload Image
        </button>
      </div>
    );
  }

  return (
    <div className="result-container">
      <h2>Analysis Result</h2>

      <div className={`result-card ${prediction?.toLowerCase() === "cancer" ? "cancer" : "other"}`}>
        <h3>{prediction}</h3>
        <p>Confidence: {(confidence * 100).toFixed(2)}%</p>
      </div>

      <button onClick={generatePDF} className="pdf-button">Download PDF Report</button>

      {prediction?.toLowerCase() === "cancer" && (
        <div className="important-note">
          <p><strong>⚠️ Important:</strong> Please consult an oral cancer specialist immediately.</p>
          <button className="doctor-button" onClick={() => handleProtectedNavigate("/dashboard/doctors")}>
            Find a Doctor
          </button>
        </div>
      )}

      <button onClick={() => handleProtectedNavigate("/dashboard")} className="back-button">
        Back to Dashboard
      </button>
      <button onClick={() => handleProtectedNavigate("/dashboard/upload-history")} className="back-button">
        View Upload History
      </button>
    </div>
  );
};

export default ResultPage;