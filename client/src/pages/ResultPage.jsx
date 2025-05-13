
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import jsPDF from "jspdf";
import "../styles/global.css";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { diseaseType, explanation } = location.state || {};

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Oral Health Analysis Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 35);
    doc.text(`Disease Type: ${diseaseType}`, 20, 45);
    doc.text("Explanation:", 20, 55);
    doc.text(doc.splitTextToSize(explanation, 170), 20, 65);
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

  if (!diseaseType) {
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

      <div className={`result-card ${diseaseType === "Cancer" ? "cancer" : "other"}`}>
        <h3>{diseaseType}</h3>
        <p>{explanation}</p>
      </div>

      <button onClick={generatePDF} className="pdf-button">Download PDF Report</button>

      {diseaseType === "Cancer" && (
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

