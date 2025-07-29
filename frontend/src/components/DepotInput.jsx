import React from "react";

const DepotInput = ({ depot, setDepot }) => {
  const handleClearDepot = () => {
    setDepot(null); // Clear the depot
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-blue-600 mb-6">Depot</h3>

      {depot ? (
        <div className="p-4 bg-gray-50 shadow-md rounded-md border border-gray-300 flex justify-between items-center">
          <div>
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-blue-500">Latitude:</span> {depot.lat}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-blue-500">Longitude:</span> {depot.lng}
            </p>
          </div>
          <button
            onClick={handleClearDepot}
            className="text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded-md border border-red-500 hover:bg-red-100"
          >
            Clear
          </button>
        </div>
      ) : (
        <p className="text-lg text-gray-600 text-center">
          Click on the map to select a depot.
        </p>
      )}
    </div>
  );
};

export default DepotInput;