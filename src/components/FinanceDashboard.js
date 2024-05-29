import React, { useState, useRef } from "react";
import Papa from "papaparse";
import { Bar, Pie } from "react-chartjs-2";

const FinanceDashboard = () => {
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [monthlyData, setMonthlyData] = useState({});
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const parsedData = results.data;
        setData(parsedData);
        processData(parsedData);
      },
    });
  };

  const processData = (data) => {
    const categoryTotals = {};
    const monthlyTotals = {};

    data.forEach((transaction) => {
      const amount = parseFloat(transaction.Amount);
      const category = transaction.Category;
      const date = new Date(transaction.Date);
      const month = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      if (category) {
        categoryTotals[category] = (categoryTotals[category] || 0) + amount;
      }

      if (month) {
        monthlyTotals[month] = (monthlyTotals[month] || 0) + amount;
      }
    });

    setCategoryData({
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          label: "Spending by Category",
          data: Object.values(categoryTotals),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    });

    setMonthlyData({
      labels: Object.keys(monthlyTotals),
      datasets: [
        {
          label: "Monthly Spending",
          data: Object.values(monthlyTotals),
          backgroundColor: "rgba(153, 102, 255, 0.6)",
        },
      ],
    });
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white text-black">
      <div className="w-full max-w-2xl p-4">
        <div className="flex flex-col items-start mb-6">
          <h1 className="text-3xl font-semibold mb-4">
            PennyPal Finance Dashboard
          </h1>
          <button
            onClick={() => fileInputRef.current.click()}
            className="mt-10 block text-sm text-gray-500 py-2 px-4 rounded-full border-0 bg-gray-200 text-black hover:bg-gray-300 cursor-pointer"
          >
            Choose File
          </button>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
        {data.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl mb-4 text-center">Spending by Category</h2>
            <div className="w-full mx-auto mb-8">
              <Pie data={categoryData} />
            </div>
            <h2 className="text-xl mb-4 text-center">Monthly Spending</h2>
            <div className="w-full mx-auto">
              <Bar data={monthlyData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceDashboard;
