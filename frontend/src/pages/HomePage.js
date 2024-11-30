import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";
const HomePage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white text-center">
      <div style={{ maxWidth: "400px" }}>
        <Lottie animationData={animationData} loop={true} />
      </div>
      <h2 className="mt-4">It looks like you are not logged in</h2>
      <p>Please log in to access the Hotel managemenet system</p>
      <Link to="/login">
        <button className="btn btn-primary mt-3 px-4 py-2">Log in</button>
      </Link>
    </div>
  );
};

export default HomePage;
