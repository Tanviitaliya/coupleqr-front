import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import wespyLogo from "./wespy.png";

function WeddingPage() {
  const [file, setFile] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  // 🧩 Compress image before upload
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const scale = 0.8; // reduce to 80% size
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            (blob) => resolve(new File([blob], file.name, { type: "image/jpeg" })),
            "image/jpeg",
            0.95 // 95% quality
          );
        };
      };
    });
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const compressed = await compressImage(selectedFile);
    setFile(compressed);
    setPreviewUrl(URL.createObjectURL(compressed));
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    try {
      const res = await fetch("https://coupleqr-back.onrender.com/api/images/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.message || "Upload successful!");
      navigate("/thankyou");
    } catch (err) {
      console.error(err);
      alert("Upload failed. Try again!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  if (!isMobile) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>⚠️ Please scan the QR code on your phone to access this page.</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {!showUpload && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", color: "#c2185b", marginBottom: "40px" }}>
            💖 Welcome to Parth & Anushka's Grand Wedding! 💖
          </h1>

          <button
            onClick={() => setShowUpload(true)}
            style={{
              backgroundColor: "#c2185b",
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
            }}
          >
            Click Me 💌
          </button>
        </div>
      )}

      {showUpload && (
        <div style={{ marginTop: "30px" }}>
          <img
            src={wespyLogo}
            alt="Wespy Logo"
            style={{
              width: "200px",
              marginTop: "5px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />

          <p style={{ fontSize: "1.2rem", color: "#555", marginTop: "10px" }}>
            Use your Camera 📸 and Look around, Hunt for those Moments that can be Found — Find Moments We May Have Missed! 💕
          </p>

          <div style={{ marginTop: "20px" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                padding: "10px",
                border: "2px solid #c2185b",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            />
          </div>

          {previewUrl && (
            <div
              style={{
                position: "relative",
                display: "inline-block",
                marginTop: "30px",
              }}
            >
              <button
                onClick={handleRemove}
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  background: "#fff",
                  border: "2px solid #c2185b",
                  borderRadius: "50%",
                  color: "#c2185b",
                  cursor: "pointer",
                  fontSize: "16px",
                  width: "28px",
                  height: "28px",
                  lineHeight: "24px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              >
                ✖
              </button>

              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  width: "250px",
                  height: "auto",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          )}

          {file && (
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handleUpload}
                disabled={isUploading}
                style={{
                  backgroundColor: "#c2185b",
                  color: "#fff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  cursor: "pointer",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
                  opacity: isUploading ? 0.6 : 1,
                }}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WeddingPage;
