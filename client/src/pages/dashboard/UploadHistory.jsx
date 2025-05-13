import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/global.css";

const UploadHistory = () => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("userEmail"); // Save on login/signup
    axios.get(`http://localhost:8000/uploads/${email}`)
      .then(res => {
        const parsed = JSON.parse(res.data);
        setUploads(parsed);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="history-container">
      <h2>Upload History</h2>
      <ul className="upload-list">
        {uploads.map((upload, i) => (
          <li key={i} className="upload-item">
            <p><strong>Disease Type:</strong> {upload.disease_type}</p>
            <p><strong>Uploaded:</strong> {new Date(upload.upload_time.$date).toLocaleString()}</p>
            <img src={upload.image_url} alt="upload" height="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadHistory;
