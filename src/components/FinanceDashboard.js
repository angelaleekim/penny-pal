import React, { useState, useRef } from "react";
import Papa from "papaparse";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const keywordCategories = {
  Business: ["google", "Google Ads", "Google Drive"],
  Coffee: ["coffee", "coff", "libertine", "starbucks", "boba", "cafe", "scout"],
  Education: ["Barron's", "ITunes", "WSJ", "WSJ/BARRON'S", "polytechnic"],
  Entertainment: [
    "games",
    "itunes",
    "blizzard",
    "blizzard entertainment",
    "NETFLIX",
    "SPOTIFY",
    "STEAM GAMES",
    "DISNEY",
  ],
  Fees: ["interest", "INTEREST CHARGED", "FEE_TRANSACTION"],
  Food: [
    "Haagen dazs",
    "Starbucks",
    "McDonald's",
    "Dominos",
    "Chipotle",
    "CHICK-FIL-A",
    "Dunkin",
    "Taco",
    "TAQUERIA",
    "In-n-out",
  ],
  Garden: ["best buy", "BEST BUY", "Home Depot"],
  Groceries: [
    "Whole Foods",
    "Kroger",
    "Safeway",
    "Trader Joe's",
    "Publix",
    "Ralph",
    "Costco",
  ],
  Health: ["CVS", "Walgreens"],
  Shopping: [
    "Amazon",
    "Walmart",
    "WALMART STORE",
    "Target",
    "Etsy",
    "Princess Polly",
    "Apple Store",
    "PetSmart",
    "T-Mobile",
    "Gym",
  ],
  Travel: [
    "Airbnb",
    "Shell Service",
    "AirBNB",
    "Lyft",
    "Uber",
    "hotel",
    "delta",
  ],
  Utilities: ["Electric", "Water", "City of San luis obispo"],
  News: ["WASHPOST"],
  Subscription: [
    "HBO Max",
    "Zoom.US",
    "Amazon Prime",
    "Gym",
    "Microsoft *Office",
    "Apple Store",
    "T-Mobile",
    "Chegg",
    "HBO Max",
    "Medium",
    "Microsoft *Office",
  ],
  Rent: ["Peter"],
  Venmo: ["Venmo"],
  Transfer: ["Transfer"],
  School: ["poly", "polytechnic"],
};

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

  const categorizeTransaction = (description) => {
    console.log(description);
    for (const [category, keywords] of Object.entries(keywordCategories)) {
      for (const keyword of keywords) {
        if (description.toLowerCase().includes(keyword.toLowerCase())) {
          console.log("{description} contains {keyword}");
          return category;
        }
      }
    }
    return "Unknown";
  };

  const processData = (data) => {
    const categoryTotals = {};
    const monthlyTotals = {};

    data.forEach((transaction) => {
      const amountString = transaction.Amount
        ? transaction.Amount.replace(/[^0-9.-]+/g, "")
        : "0";
      const amount = parseFloat(amountString);
      const description = transaction.Description || "";
      const category = categorizeTransaction(description);
      const date = new Date(transaction["Posting Date"]);
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
            className="block text-sm text-gray-500 py-2 px-4 rounded-full border-0 bg-gray-200 text-black hover:bg-gray-300 cursor-pointer"
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
          <div className="mt-56">
            <h2 className="text-xl mb-10 text-center">Spending by Category</h2>
            <div className="w-full mx-auto mb-20">
              <Pie data={categoryData} />
            </div>
            <h2 className="text-xl mb-10 text-center">Monthly Spending</h2>
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
