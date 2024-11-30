import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";
import { Button } from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    // Remove the 'token' cookie
    Cookies.remove("token", { secure: true, sameSite: "strict" });

    // Redirect to login page after logout
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white text-center">
      <div style={{ maxWidth: "400px" }}>
        <Lottie animationData={animationData} loop={true} />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout} // Logout handler
        className="mt-3"
      >
        Logout
      </Button>
    </div>
  );
};

export default HomePage;
