import React, { useState } from "react";
import { Button } from "@mui/material"; 

interface CustomButtonProps {
  label: string;
  userColor: string;
  userFont: string;
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, userColor,userFont, onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleTouchStart = () => setIsActive(true);
  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsActive(false);
    }, 100);
  };
  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "#f0f0f0";
  };
  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = userColor.toLowerCase();
  };

  return (
    <Button
      variant="contained"
      style={{
        color: ["Black", "Blue", "Purple"].includes(userColor) ? "white" : "black",
        backgroundColor: isActive ? "#f0f0f0" : userColor.toLowerCase(),
        borderRadius: "12px",
        fontFamily: userFont,
        padding: "10px 20px",
        textTransform: "none",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease, background-color 0.2s ease",
        transform: isActive ? "scale(0.98)" : "scale(1)",
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => {
        setIsActive(false);
        onClick();
      }}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
