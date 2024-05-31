// HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css"; // Import the CSS file for animation and styling

const HeroSection = () => {
  return (
    <div className="flex flex-col items-start justify-center min-h-screen bg-white text-black p-8 fade-in">
      <header className="w-full max-w-2xl">
        <h1 className="text-4xl font-semibold mb-10">
          Welcome to <span className="jumping gradient-text">PennyPal!</span>
        </h1>
        <p className="text-lg mb-10">
          Take control of your finances with PennyPal, the personal finance app
          designed to simplify your spending analysis. Easily upload your Chase
          bank statement CSV file and gain valuable insights with our intuitive
          charts.
        </p>
        <Link
          to="/dashboard"
          className="inline-block text-md py-2 px-4 rounded-full my-button"
        >
          Get Started
        </Link>
      </header>
    </div>
  );
};

export default HeroSection;
