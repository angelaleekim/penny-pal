// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Papa from "papaparse";
import HeroSection from "./components/HeroSection";
import FinanceDashboard from "./components/FinanceDashboard";

const App = () => {
  const [fileData, setFileData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const parsedData = results.data;
        setFileData(parsedData);
      },
    });
  };

  return (
    <Router>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
        <Routes>
          <Route
            path="/"
            element={<HeroSection onFileUpload={handleFileUpload} />}
          />
          <Route
            path="/dashboard"
            element={<FinanceDashboard data={fileData} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
