import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AsteroidChart = ({ asteroidData }) => {
  // Check for valid asteroid data
  if (!asteroidData || !asteroidData.near_earth_objects) {
    console.warn("Invalid asteroid data for chart");
    return null;
  }
  //I was expecting arrays but it is objects
  const dates = Object.keys(asteroidData.near_earth_objects);
  const asteroidCounts = dates.map(
    (date) => asteroidData.near_earth_objects[date].length
  );

  console.log("Asteroid counts per day:", asteroidCounts);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Number of Asteroids",
        data: asteroidCounts,
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        borderColor: "rgb(99, 102, 241)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Asteroids per Day",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg p-6">
      <Bar data={data} options={options} />
    </div>
  );
};

export default AsteroidChart;
