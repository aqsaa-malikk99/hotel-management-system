import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { loginUser } from "../services/authService.js";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../styles/LoginPage.css";
function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrorMessage("");
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //form LOGIN SUBMISSION
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setErrorMessage(""); // Clear previous error message
    setLoading(true); // Show loading state for the button

    if (email === "" || password === "") {
      setErrorMessage("Please enter the email and password");
      setLoading(false);
      return;
    }
    try {
      // Collect login credentials from state
      const credentials = {
        email,
        password,
      };

      // Make the API call to login endpoint
      const response = await loginUser(credentials);

      // Check if a token is present in the response
      if (response.token) {
        // Save the token in a secure, HTTP-only cookie
        Cookies.set("token", response.token, {
          secure: true,
          sameSite: "strict",
        });

        // Redirect the user to the dashboard or desired page
        window.location.href = "/dashboard"; // Replace with your desired route
      } else {
        // If no token is returned, show an error message
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Error during login:", err);

      // Show error message based on error response
      console.error("Error during login:", err);
      if (err.code === "ERR_NETWORK") {
        setErrorMessage(
          "Network error. Please check your connection or backend."
        );
      } else if (err.response && err.response.data && err.response.data.msg) {
        setErrorMessage(err.response.data.msg);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Remove loading state
    }
  };
  return (
    <div className="login-page d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 m-4 shadow rounded">
        <div className="text-center mb-4">
          <img src="/logo192.png" alt="logo" width="80" />

          {/* <img src={logo} alt="logo" width="80" /> */}
        </div>

        <h3 className="text-center mb-3 text-primary">Paradise View</h3>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            fullWidth
          />
          <TextField
            label="Password"
            type={passwordVisible ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisiblity}>
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errorMessage && (
            <div className="text-danger mt-2" style={{ fontSize: "0.9rem" }}>
              {errorMessage}
            </div>
          )}

          <div className="d-grid gap-2 mt-3">
            <Button variant="contained" color="primary" fullWidth type="submit">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
          <div className="text center mt-3">
            <Link to="/register">
              <Button
                variant="outlined"
                sx={{ color: "#001829", borderColor: "#001829" }}
                fullWidth
              >
                Register New Member
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
