//import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { CssBaseline } from "@mui/material";

export default function Header() {
  return (
    <>
    <CssBaseline />
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          Your New Email Signature
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
    </>
  )
}