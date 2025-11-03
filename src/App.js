import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QRCode from "react-qr-code";
import WeddingPage from "./WeddingPage";
import ThankYouPage from "./ThankYouPage";

function App() {
  // 👉 Replace localhost with your computer’s local IP (so your phone can access it)
  // Example: "http://192.168.31.155:3000/wedding"
 const qrValue = "https://coupleqr-front.vercel.app/wedding";

  return (
    <Router>
      <Routes>
        {/* QR Code Page (Desktop) */}
        <Route
          path="/"
          element={
            <div style={{ textAlign: "center", marginTop: "60px" }}>
              <h1>💍 Our Wedding QR Code</h1>
              <p>📱 Scan this QR code on your phone to upload your photo 💖</p>

              <div
                style={{
                  display: "inline-block",
                  padding: "16px",
                  background: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  marginTop: "20px",
                }}
              >
                <QRCode value={qrValue} size={220} />
              </div>

              <p style={{ marginTop: "15px", color: "#666" }}>{qrValue}</p>
            </div>
          }
        />

        {/* Wedding Upload Page (Mobile only) */}
        <Route path="/wedding" element={<WeddingPage />} />
         <Route path="/thankyou" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;
