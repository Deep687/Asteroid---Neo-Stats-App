import { useState } from "react";
import axios from "axios";
import DateForm from "./DateRangeForm";
import AsteroidStats from "./AsteroidInfoStats";
import AsteroidChart from "./AsteroidChart";

function App() {
  const [asteroidInfo, setAsteroidInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchAsteroidData(startDate, endDate) {
    setLoading(true);
    setError(null);
    setAsteroidInfo(null);

    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;

    try {
      console.log(
        `Fetching asteroid data for date range: ${startDate} to ${endDate}`
      );
      const response = await axios.get(url);
      setAsteroidInfo(response.data);
      console.log("Asteroid data fetched successfully");
    } catch (err) {
      console.error("Error fetching asteroid data:", err);
      setError(
        err.response?.data?.error?.message ||
          err.message ||
          "Failed to fetch data. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0  sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Asteroid - Neo Stats App
          </h1>
          <DateForm onSubmit={fetchAsteroidData} />
          {loading && (
            <p className="text-center text-gray-600 mt-4">
              Loading asteroid data...
            </p>
          )}
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
          {asteroidInfo && (
            <div className="mt-8">
              <AsteroidStats
                isLoading={loading}
                error={error}
                asteroidData={asteroidInfo}
              />
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
