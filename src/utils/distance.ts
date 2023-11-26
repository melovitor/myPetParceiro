 // Function to convert degrees to radians
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Function to calculate the distance between two points using the Haversine formula
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadiusInKm = 6371; // Mean radius of the Earth in kilometers

  // Convert coordinates from degrees to radians
  const lat1Radians = degreesToRadians(lat1);
  const lon1Radians = degreesToRadians(lon1);
  const lat2Radians = degreesToRadians(lat2);
  const lon2Radians = degreesToRadians(lon2);

  // Difference in latitudes and longitudes
  const latDifference = lat2Radians - lat1Radians;
  const lonDifference = lon2Radians - lon1Radians;

  // Haversine formula
  const a = Math.sin(latDifference / 2) ** 2 + Math.cos(lat1Radians) * Math.cos(lat2Radians) * Math.sin(lonDifference / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  const distance = earthRadiusInKm * c;

  return distance.toFixed(2);
}

// Example of usage
const distance = calculateDistance(52.5200, 13.4050, 48.8566, 2.3522); // Berlin to Paris
