import React from "react";

function ThankYouPage() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "150px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#c2185b" }}>
        🎉 Thank You for Sharing Your Photo! 💕
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#555", marginTop: "20px" }}>
        Your picture has been uploaded successfully.  
        We’re so happy to have your presence in our special moments! 💐
      </p>

      <img
        src="https://cdn-icons-png.flaticon.com/512/3159/3159310.png"
        alt="thank you"
        style={{ width: "180px", marginTop: "40px" }}
      />
    </div>
  );
}

export default ThankYouPage;
