import React from "react";
import "./landing-page.css"; // Import your custom CSS for additional styling
import LandingPageNavBar from "./navbar/landing-page-navbar";
import { Routes, Route } from "react-router-dom";
import SignIn from "./signin/sign-in";
import ForgotPassword from "./signin/forget-password";
import { Box } from "@mui/material";
import SingUp from "./sign-up/sign-up";
import SignUp from "./sign-up/sign-up";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <LandingPageNavBar />
      <LandingPageContainer />
    </div>
  );
};

function LandingPageContainer() {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Routes>
        <Route path="*" element={<SignIn />} />
        <Route path="/home" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/forget-password" element={<ForgotPassword />} />
      </Routes>
    </Box>
  );
}

export default LandingPage;
