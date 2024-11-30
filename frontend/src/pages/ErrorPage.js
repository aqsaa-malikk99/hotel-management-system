import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/error.json";
const ErrorPage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <div style={{ maxWidth: "400px" }}>
        <Lottie animationData={animationData} loop={true} />
      </div>
      <h2 className="mt-4">Oops! 404 Page Not Found!</h2>
      <p>
        The page you are looking for either doesnt exists or an error has
        occured
      </p>
      <Link to="/">
        <button className="btn btn-primary mt-3 px-4 py-2">
          Go back to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
