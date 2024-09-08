import PropTypes from "prop-types";
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
  if (!asteroidData?.near_earth_objects) return null;

  const dates = Object.keys(asteroidData.near_earth_objects);
  const asteroidCounts = dates.map(
    (date) => asteroidData.near_earth_objects[date].length
  );

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Number of Asteroids",
        data: asteroidCounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: "Asteroids per Day" },
    },
  };

  return <Bar data={chartData} options={options} />;
};

AsteroidChart.propTypes = {
  asteroidData: PropTypes.shape({
    near_earth_objects: PropTypes.object.isRequired,
  }).isRequired,
};

export default AsteroidChart;
