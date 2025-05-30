import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/global.css";

const UploadHistory = ({ userId }) => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    let url = `http://localhost:8000/detections/?token=${encodeURIComponent(token)}`;
    if (userId) {
      url += `&user_id=${userId}`;
    }

    axios.get(url)
      .then(res => {
        setUploads(res.data);
      })
      .catch(err => {
        console.error("Error fetching detections:", err);
      });
  }, [userId]);

  return (
    <div className="history-container">
      <h2 className="history-title">
        {userId ? `Detections for User ID ${userId}` : "Your Detection History"}
      </h2>

      {uploads.length === 0 ? (
        <p className="no-detections">No detections found.</p>
      ) : (
        <ul className="upload-list">
          {uploads.map((upload, i) => (
            <li key={i} className="upload-item">
              <div className="upload-image-wrapper">
                <img 
                  src={upload.image_url} 
                  alt="Detection" 
                  className="upload-image"
                />
              </div>
              <div className="upload-info">
                <p><strong>🧪 Result:</strong> {upload.prediction}</p>
                <p><strong>📈 Confidence:</strong> {upload.confidence.toFixed(4)}</p>
                <p><strong>🕒 Detected On:</strong> {new Date(upload.detected_at).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UploadHistory;
