import PropTypes from "prop-types";
import { useMemo } from "react";

// AsteroidInfoStats component for displaying asteroid statistics
const AsteroidInfoStats = ({ asteroidData }) => {
  // Calculate asteroid statistics using useMemo for performance optimization
  const stats = useMemo(() => {
    if (!asteroidData?.near_earth_objects) return null;

    const allAsteroids = Object.values(asteroidData.near_earth_objects).flat();
    const totalCount = allAsteroids.length;
    const potentiallyHazardous = allAsteroids.filter(
      (a) => a.is_potentially_hazardous_asteroid
    ).length;

    let fastestAsteroid = { speed: 0, id: "" };
    let closestAsteroid = { distance: Infinity, id: "" };
    let totalSize = 0;

    allAsteroids.forEach((asteroid) => {
      const speed = parseFloat(
        asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour
      );
      const distance = parseFloat(
        asteroid.close_approach_data[0].miss_distance.kilometers
      );
      const size =
        (asteroid.estimated_diameter.kilometers.estimated_diameter_min +
          asteroid.estimated_diameter.kilometers.estimated_diameter_max) /
        2;

      if (speed > fastestAsteroid.speed) {
        fastestAsteroid = { speed, id: asteroid.id };
      }
      if (distance < closestAsteroid.distance) {
        closestAsteroid = { distance, id: asteroid.id };
      }
      totalSize += size;
    });

    const averageSize = totalSize / totalCount;

    return {
      totalCount,
      potentiallyHazardous,
      safeCount: totalCount - potentiallyHazardous,
      fastestAsteroid,
      closestAsteroid,
      averageSize,
    };
  }, [asteroidData]);

  if (!stats) {
    console.warn("No asteroid data available for stats");
    return null;
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Asteroid Statistics</h2>
      <p>Total Asteroids: {stats.totalCount}</p>
      <p>Potentially Hazardous: {stats.potentiallyHazardous}</p>
      <p>Safe Asteroids: {stats.safeCount}</p>
      <p>
        Fastest Asteroid: ID {stats.fastestAsteroid.id} (
        {stats.fastestAsteroid.speed.toFixed(2)} km/h)
      </p>
      <p>
        Closest Asteroid: ID {stats.closestAsteroid.id} (
        {stats.closestAsteroid.distance.toFixed(2)} km)
      </p>
      <p>Average Asteroid Size: {stats.averageSize.toFixed(2)} km</p>
    </div>
  );
};

AsteroidInfoStats.propTypes = {
  asteroidData: PropTypes.shape({
    near_earth_objects: PropTypes.object.isRequired,
  }).isRequired,
};

export default AsteroidInfoStats;
