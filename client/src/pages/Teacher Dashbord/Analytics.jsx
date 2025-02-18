import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
// import { getAllUsers, getAllUsersTeachers,  getAllFiles  } from "../Services/ItemServices";
import { getAllFiles, getAllUsersTeachers, getAllUsers } from "../../services/Api";

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
   const [userItems, setIsUserItems] = useState([]);
   const [userItemsTeachers, setIsUserItemsTeachers] = useState([]);
   const [files, setFiles] = useState([]);

   const allUserItems = userItems.concat(userItemsTeachers).length;
   const allFiles = files.length;
   const principalTotal = userItems.length;
   const teachersTotal = userItemsTeachers.length;

  // Mock data
  const labels = ["Total Users", "New Files", "Total Principals", "Total Teachers"];
  const data = [allUserItems, allFiles, principalTotal, teachersTotal];

  // Fetch All users
   useEffect(()=>{
    const fetchAllUsers = async ()=>{
      try {
        const response = await getAllUsers();
        setIsUserItems(response.data);
        const responseTeachers = await getAllUsersTeachers();
        setIsUserItemsTeachers(responseTeachers.data);
        const getFiles = await getAllFiles();
        setFiles(getFiles);
      } catch (error) {
        console.error('Failed to fetch data or error!', error);
        throw error;
      }
    }
  
    fetchAllUsers();
  
   },[]);
  

  // Chart.js data
  const chartData = {
    labels,
    datasets: [
      {
        label: "Count",
        data,
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // Blue
          "rgba(34, 197, 94, 0.8)",  // Green
          "rgba(234, 179, 8, 0.8)",  // Yellow
          "rgba(239, 68, 68, 0.8)",  // Red
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Analytics Overview",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Categories",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Analytics Overview</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Analytics;
