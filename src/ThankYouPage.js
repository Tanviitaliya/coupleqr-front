import React from "react";
import coupleLogo from "./couplelogo.png"; // ✅ Import your image

function ThankYouPage() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "150px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
        {/* ✅ Updated Image */}
      <img
        src={coupleLogo}
        alt="couple logo"
        style={{ width: "180px", marginTop: "40px" }}
      />
      
      <h1 style={{ fontSize: "2.5rem", color: "#c2185b" }}>
        🎉 Thank You for Sharing Your Photo! 💕
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#555", marginTop: "20px" }}>
        Your picture has been uploaded successfully.  
        We’re so happy to have your presence in our special moments! 💐
      </p>

    
    </div>
  );
}

export default ThankYouPage;
