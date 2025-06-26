import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/global.css";

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError("");
    } else {
      setError("Please drop a valid image file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", image);

    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.post(
        `http://localhost:8000/predict?token=${token}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { prediction, confidence } = res.data;

      navigate("/result", {
        state: {
          prediction,
          confidence,
          imageName: image.name,
        },
      });
    } catch (err) {
      console.error("Prediction Error:", err);
      console.error("Error Response:", err.response?.data, "Status:", err.response?.status);
      // Check for invalid token (flexible to handle variations)
      if (
        err.response?.status === 401 &&
        err.response?.data?.detail &&
        typeof err.response.data.detail === "string" &&
        err.response.data.detail.toLowerCase().includes("invalid")
      ) {
        setError("invalid_token");
      } else {
        setError(
          err.response?.data?.detail || "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Analyze Your Oral Lesion</h2>
      <p className="upload-subtitle">Upload or drag an image of the lesion for AI-powered analysis.</p>

      {error && (
        <div className="error-msg">
          {error === "invalid_token" ? (
            <div className="error-content">
              <span>Your session has expired. Please </span>
              <button
                className="error-cta-button"
                onClick={() => navigate("/login")}
              >
                log in 
              </button>
              <span> or </span>
              <button
                className="error-cta-button"
                onClick={() => navigate("/signup")}
              >
                sign up
              </button>
              <span> to continue.</span>
            </div>
          ) : (
            <span>{error}</span>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="upload-form" onDragOver={handleDragOver} onDrop={handleDrop}>
        <div className="upload-area">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="upload-input"
            id="file-input"
            required
          />
          <label htmlFor="file-input" className="upload-label">
            {previewUrl ? (
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" />
              </div>
            ) : (
              <div className="upload-placeholder">
                <span className="upload-icon">📷</span>
                <p>Drag & drop an image or click to browse</p>
              </div>
            )}
          </label>
        </div>

        <button type="submit" className="upload-button" disabled={loading}>
          {loading ? (
            <span className="loading-spinner">Analyzing...</span>
          ) : (
            "Analyze Now"
          )}
        </button>
      </form>
    </div>
  );
}