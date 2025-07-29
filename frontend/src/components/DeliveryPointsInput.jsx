import React from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DeliveryPointsInput = ({ deliveryPoints, setDeliveryPoints, depot }) => {
  const navigate = useNavigate();

  const handleRemovePoint = (indexToRemove) => {
    const updatedPoints = deliveryPoints.filter((_, index) => index !== indexToRemove);
    setDeliveryPoints(updatedPoints); // Update the delivery points
  };

  const handleCalculateRoute = () => {
    console.log("Depot:", depot); // Debugging
    console.log("Delivery Points:", deliveryPoints); // Debugging

    if (!depot || !depot.lat || !depot.lng) {
      alert("Please select a depot before calculating the route.");
      return;
    }
    if (deliveryPoints.length === 0) {
      alert("Please add at least one delivery point before calculating the route.");
      return;
    }

    // Navigate to the Optimal Route Page and pass data via state
    navigate("/optimal-route", {
      state: { depot, deliveryPoints },
    });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold text-blue-600 mb-6">Delivery Points</h3>

        {/* Delivery Points Section */}
        {deliveryPoints.length > 0 ? (
          <div className="space-y-4 overflow-y-auto max-h-[300px]">
            {deliveryPoints.map((point, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 shadow-md rounded-md border border-gray-300 flex justify-between items-center"
              >
                <div>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold text-blue-500">Latitude:</span> {point.lat}
                  </p>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold text-blue-500">Longitude:</span> {point.lng}
                  </p>
                </div>
                <button
                  onClick={() => handleRemovePoint(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600 text-center">
            Click on the map to add delivery points.
          </p>
        )}
      </div>

      {/* Calculate Route Button */}
      <button
        onClick={handleCalculateRoute}
        className="mt-6 w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-600 shadow-md"
      >
        Calculate Optimal Route
      </button>
    </div>
  );
};

export default DeliveryPointsInput;