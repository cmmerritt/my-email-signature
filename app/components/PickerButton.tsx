import React from "react";
import { Button } from "@mui/material";

interface PickerButtonProps {
  onClick: () => void;
  label: string;
}

const PickerButton: React.FC<PickerButtonProps> = ({ onClick, label }) => {
  return (
    <Button onClick={onClick} className="picker-button">
      {label}
    </Button>
  );
};

export default PickerButton;