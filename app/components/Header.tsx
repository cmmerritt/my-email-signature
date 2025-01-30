import React from "react";
import { AppBar, Toolbar,  Button } from "@mui/material";

const handleReload = () => {
  window.location.reload();
};

const Header: React.FC = () => {
  return (
    <AppBar>
      <Toolbar>
        Your New Email Signature
        <Button onClick={handleReload} sx={{ color: "white" }}>
          Get a new quote
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;