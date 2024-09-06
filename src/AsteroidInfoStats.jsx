import PropTypes from "prop-types";

const AsteroidStats = ({ isLoading, error, asteroidData }) => {
  // Handle loading state
  if (isLoading) {
    return <p>Loading asteroid data...</p>;
  }

  // Handle error state
  if (error) {
    console.error("Error in AsteroidStats:", error);
    return <p className="text-red-500">Error: {error}</p>;
  }

  // Check for valid asteroid data
  if (!asteroidData || !asteroidData.near_earth_objects) {
    console.warn("No asteroid data available");
    return null;
  }

  // Object.values() returns an array of the object's values
  // So, I am taking all the arrays of asteroids for each date and combining them into one array
  const asteroids = Object.values(asteroidData.near_earth_objects).flat();

  if (asteroids.length === 0) {
    console.info("No asteroids found in the given date range");
    return <p>No asteroid data available.</p>;
  }

  let fastestAsteroid = { id: null, speed: 0 };
  let closestAsteroid = { id: null, distance: Infinity };
  let totalSize = 0;

  // Calculate statistics
  asteroids.forEach((asteroid) => {
    // Calculate speed
    const speed = parseFloat(
      asteroid.close_approach_data[0]?.relative_velocity.kilometers_per_hour ||
        0
    );
    if (speed > fastestAsteroid.speed) {
      fastestAsteroid = { id: asteroid.id, speed };
    }

    // Calculate distance
    const distance = parseFloat(
      asteroid.close_approach_data[0]?.miss_distance.kilometers || Infinity
    );
    if (distance < closestAsteroid.distance) {
      closestAsteroid = { id: asteroid.id, distance };
    }

    // Calculate size
    const minDiameter =
      asteroid.estimated_diameter.kilometers.estimated_diameter_min;
    const maxDiameter =
      asteroid.estimated_diameter.kilometers.estimated_diameter_max;
    totalSize += (minDiameter + maxDiameter) / 2;
  });

  const avgSize = totalSize / asteroids.length;

  console.log("Asteroid statistics calculated:", {
    fastestAsteroid,
    closestAsteroid,
    averageSize: avgSize,
  });

  // Render the stats
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Asteroid Stats
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Fastest Asteroid"
          value={fastestAsteroid.id || "N/A"}
          subvalue={`${fastestAsteroid.speed.toFixed(2)} km/h`}
        />
        <StatCard
          title="Closest Asteroid"
          value={closestAsteroid.id || "N/A"}
          subvalue={`${closestAsteroid.distance.toFixed(2)} km`}
        />
        <StatCard title="Average Size" value={`${avgSize.toFixed(2)} km`} />
      </div>
    </div>
  );
};

// Helper component for each stat card
const StatCard = ({ title, value, subvalue }) => (
  <div className="bg-teal-50 p-4 rounded-md">
    <h3 className="text-sm font-medium text-teal-700">{title}</h3>
    <p className="mt-1 text-2xl font-semibold text-gray-800">{value}</p>
    {subvalue && <p className="text-sm text-teal-600">{subvalue}</p>}
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subvalue: PropTypes.string,
};

AsteroidStats.propTypes = {
  asteroidData: PropTypes.shape({
    near_earth_objects: PropTypes.object,
  }),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

export default AsteroidStats;
