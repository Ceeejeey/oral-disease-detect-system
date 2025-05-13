
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/global.css";

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await axios.post("http://localhost:8000/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const diseaseType = res.data.result;

      // Optionally save to backend only if user is logged in
      if (user?.email) {
        await axios.post("http://localhost:8000/api/save-result", {
          disease_type: diseaseType,
          explanation:
            diseaseType === "Cancer"
              ? "The lesion has features commonly associated with oral cancer."
              : "The lesion appears to be a non-cancerous oral condition.",
          image_name: image.name,
          date: new Date().toISOString(),
          user_email: user.email,
        });
      }

      navigate("/result", {
        state: {
          diseaseType: diseaseType,
          explanation:
            diseaseType === "Cancer"
              ? "The lesion has features commonly associated with oral cancer."
              : "The lesion appears to be a non-cancerous oral condition.",
          imageName: image.name,
        },
      });
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload an Image of the Lesion</h2>
      <p>Here you can upload your mouth image for analysis.</p>
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        {previewUrl && (
          <div className="image-preview">
            <img src={previewUrl} alt="Preview" />
          </div>
        )}
        <button type="submit">Analyze</button>
      </form>
    </div>
  );
}

