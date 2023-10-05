import React from "react";
import { Link } from "react-router-dom";

const WhatsApp = () => {
  return (
    <Link
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        height: "50px",
        width: "50px",
        background: "#36f06c",
        zIndex: "999",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        backgroundImage: `url("https://cdn-icons-png.flaticon.com/512/1384/1384023.png")`,
        backgroundSize: "65%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        cursor: "pointer",
        border: "none",
      }}
      to="https://wa.me/923272026242"
      target="_blank"
    />
  );
};

export default WhatsApp;
