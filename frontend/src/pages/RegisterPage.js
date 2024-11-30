import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../styles/RegisterPage.css";
import { registerUser } from "../services/authService";

function RegisterPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  // Validation function for email format
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Validation function for password
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/; // At least 6 characters, one uppercase, one special character
    return passwordRegex.test(password);
  };

  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setErrorMessage(""); // Clear previous error message
    setLoading(true); // Show loading state for the button

    // Basic validations
    if (!firstName || !lastName || !email || !password) {
      setErrorMessage("Please complete all fields.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 6 characters long, contain one uppercase letter, and one special character."
      );
      setLoading(false);
      return;
    }

    try {
      // Collect register details including static roleType
      const details = {
        firstName,
        lastName,
        email,
        password,
        roleType: "Manager", // Static role type
      };

      // Make the API call to register
      const response = await registerUser(details);

      // Check if a token is present in the response
      if (response.token) {
        // Save the token in a secure, HTTP-only cookie
        Cookies.set("token", response.token, {
          secure: true,
          sameSite: "strict",
        });

        // Redirect the user to the dashboard or desired page
        window.location.href = "/"; // Replace with your desired route
      } else {
        // If no token is returned, show an error message
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during registration:", err);

      // Show error message based on error response
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
        </div>

        <h3 className="text-center mb-3 text-primary">Paradise View</h3>
        <form onSubmit={handleRegister}>
          <TextField
            label="First Name"
            type="text"
            variant="outlined"
            margin="normal"
            value={firstName}
            onChange={handleFirstNameChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            type="text"
            variant="outlined"
            margin="normal"
            value={lastName}
            onChange={handleLastNameChange}
            fullWidth
          />
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
                  <IconButton onClick={togglePasswordVisibility}>
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
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </div>
          <div className="text-center mt-3">
            <Link to="/login">
              <Button
                variant="outlined"
                sx={{ color: "#001829", borderColor: "#001829" }}
                fullWidth
              >
                Already a Member
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
