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
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!image) return;

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

    if (err.response && err.response.data) {
      setError(err.response.data.detail);
    } else {
      setError("Something went wrong. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="upload-container">
      <h2>Analyze Your Oral Lesion</h2>
      <p>Upload an image of the lesion for analysis.</p>

      {error && <div className="error-msg">{error}</div>}

      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        {previewUrl && (
          <div className="image-preview">
            <img src={previewUrl} alt="Preview" />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>
    </div>
  );
}
