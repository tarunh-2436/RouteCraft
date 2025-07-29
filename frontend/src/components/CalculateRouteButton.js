import React from "react";

const CalculateRouteButton = ({ deliveryPoints }) => {
  const calculateOptimalRoute = () => {
    if (deliveryPoints.length < 2) {
      alert("Add at least two delivery points to calculate the route.");
      return;
    }

    // Placeholder logic for calculating the optimal route
    // Replace this with an actual algorithm like TSP
    const route = deliveryPoints.map((point, index) => `Point ${index + 1}: (${point.lat}, ${point.lng})`);
    alert(`Optimal Route:\n${route.join(" -> ")}`);
  };

  return (
    <button
      onClick={calculateOptimalRoute}
      className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
    >
      Calculate Optimal Route
    </button>
  );
};

export default CalculateRouteButton;