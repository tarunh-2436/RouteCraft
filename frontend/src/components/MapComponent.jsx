import React from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icons
const depotIcon = L.icon({
  iconUrl: "https://img.icons8.com/?size=100&id=13800&format=png&color=000000", // Red pin icon URL
  iconSize: [30, 41], // Size of the icon
  iconAnchor: [12, 41], // Anchor point of the icon
});

const deliveryPointIcon = L.icon({
  iconUrl: "https://img.icons8.com/?size=100&id=7880&format=png&color=000000", // Black pin icon URL
  iconSize: [35, 41], // Size of the icon
  iconAnchor: [12, 41], // Anchor point of the icon
});

const MapComponent = ({ depot, deliveryPoints, route, onMapClick }) => {
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        onMapClick(e.latlng); // Pass clicked location to parent
      },
    });
    return null;
  };

  // Debug log to check route data
  console.log("Route data in MapComponent:", route ? route.slice(0, 5) : "No route");

  return (
    <MapContainer
      center={depot || [51.505, -0.09]} // Center on depot if available
      zoom={13}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
      {/* Depot Marker */}
      {depot && <Marker position={depot} icon={depotIcon} />}
      {/* Delivery Points Markers */}
      {deliveryPoints.map((point, index) => (
        <Marker key={index} position={point} icon={deliveryPointIcon} />
      ))}
      {/* Route as a Red Polyline */}
      {route && route.length > 1 && (
        <Polyline 
          positions={route} 
          color="red" 
          weight={4} 
          // Add useful logging when the polyline is clicked
          eventHandlers={{
            click: () => {
              console.log("Route polyline clicked. Route points:", route.length);
            }
          }}
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;