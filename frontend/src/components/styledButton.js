import React from "react";
import { Button } from "@mui/material";

const StyledButton = ({ title, mode, validation, onClick, width }) => {
  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 0",
        cursor: "pointer",
        backgroundColor: mode === "dark" ? "black" : "#e63146",
        color: mode === "dark" ? "white" : "white",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2);",
        "&:hover,& .css-hnghlo-MuiButtonBase-root-MuiButton-root": {
          color: mode === "dark" ? "white" : "white",
          backgroundColor: mode === "dark" ? "#e63146" : "black",
        },
        width: width || "100%",
        fontFamily: "Poppins, sans-serif",
      }}
      className="swiper-btn"
      disabled={validation}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default StyledButton;
