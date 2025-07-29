import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom Icons
const depotIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/?size=100&id=13800&format=png&color=000000",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const deliveryPointIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/?size=100&id=7880&format=png&color=000000",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Component to fit map bounds to the route
const FitBounds = ({ route }) => {
  const map = useMap();

  useEffect(() => {
    if (route.length > 0) {
      const bounds = L.latLngBounds(route);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [route, map]);

  return null;
};

const OptimalRoutePage = ({ depot, deliveryPoints }) => {
  const [route, setRoute] = useState([]);
  const [orderedStops, setOrderedStops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOptimalRoute = async () => {
    if (!depot || deliveryPoints.length === 0) {
      setError("Please select a depot and at least one delivery point.");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      depot: [depot.lat, depot.lng],
      deliveryPoints: deliveryPoints.map((point) => [point.lat, point.lng]),
    };

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/optimal-route", payload);
      console.log("Route data received:", response.data); // Debug log
      setRoute(response.data.route);
      setOrderedStops(response.data.orderedStops);
    } catch (err) {
      console.error("Error fetching route:", err);
      setError("Failed to fetch optimal route.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptimalRoute();
  }, [depot, deliveryPoints]);

  return (
    <div className="bg-gray-100 w-full h-[90vh] flex">
      <div className="flex-1 flex flex-row gap-6 p-6">
        {/* Map */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-0">
          <MapContainer
            center={depot || [51.505, -0.09]}
            zoom={13}
            className="h-full w-full rounded-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            {depot && <Marker position={[depot.lat, depot.lng]} icon={depotIcon} />}
            {deliveryPoints.map((point, index) => (
              <Marker key={index} position={[point.lat, point.lng]} icon={deliveryPointIcon} />
            ))}
            {route.length > 1 && (
              <>
                <Polyline positions={route} color="red" weight={4} />
                <FitBounds route={route} />
              </>
            )}
          </MapContainer>
        </div>

        {/* Route Summary */}
        <div className="w-full lg:w-[30%] bg-white shadow-lg rounded-lg p-6 flex flex-col">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Route Summary</h2>

          {loading && <p className="text-gray-600">Calculating optimal route...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex-1 overflow-y-auto">
            {orderedStops.length > 0 ? (
              <ul className="space-y-2 mt-2">
                {[...orderedStops]
                  .sort((a, b) => a.sequence - b.sequence) // Sort by sequence number
                  .map((stop, index) => (
                    <li
                      key={index}
                      className="p-2 bg-gray-50 rounded-md shadow-sm border border-gray-200"
                    >
                      <p className="text-gray-800 font-semibold">{stop.label}</p>
                      <p className="text-gray-600">
                        <span className="font-bold">Latitude:</span> {stop.lat}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-bold">Longitude:</span> {stop.lng}
                      </p>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-gray-600 mt-2">No route available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimalRoutePage;