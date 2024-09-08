import { useState } from "react";
import DateForm from "./DateRangeForm";
import LoadingSpinner from "./LoadingSpinner";
import AsteroidInfoStats from "./AsteroidInfoStats";
import AsteroidChart from "./AsteroidChart";

// Main App component
function App() {
  // State hooks for managing loading, error, and asteroid data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [asteroidInfo, setAsteroidInfo] = useState(null);

  // Function to fetch asteroid data from NASA API
  const fetchAsteroidData = async (startDate, endDate) => {
    console.log(
      `Fetching asteroid data for date range: ${startDate} to ${endDate}`
    );
    setLoading(true);
    setError(null);
    try {
      const API_KEY = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";
      const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log("Asteroid data fetched successfully");
      setAsteroidInfo(data);
    } catch (err) {
      console.error("Error fetching asteroid data:", err);
      setError(`Failed to fetch asteroid data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Render the component
  return (
    <div className="min-h-screen bg-slate-900 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Asteroid - Neo Stats App
          </h1>
          {/* Date range form component */}
          <DateForm onSubmit={fetchAsteroidData} />
          {/* Show loading spinner when fetching data */}
          {loading && <LoadingSpinner />}
          {/* Display error message if any */}
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
          {/* Display asteroid information and chart when data is available */}
          {asteroidInfo && (
            <div className="mt-8">
              <AsteroidInfoStats asteroidData={asteroidInfo} />
              <div className="mt-8">
                <AsteroidChart asteroidData={asteroidInfo} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
