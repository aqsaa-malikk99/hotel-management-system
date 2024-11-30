import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Lottie from "lottie-react";
import animationData from "./assets/animation.json";
import Cookies from "js-cookie";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function AuthCheck() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // To track authentication status

  useEffect(() => {
    const token = Cookies.get("token"); // Check if the token exists
    if (token) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  if (isAuthenticated === null) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white text-center">
        <div style={{ maxWidth: "400px" }}>
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    ); // You can replace this with a loading animation if desired
  }

  return null; // If authenticated, nothing to render here
}

function ProtectedRoute({ element }) {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // If no token, redirect to login page
      navigate("/login");
    }
  }, [token, navigate]);

  return token ? element : null; // Render the element if authenticated, else nothing
}

function App() {
  return (
    <Router>
      <AuthCheck /> {/* This will check for authentication before routing */}
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
