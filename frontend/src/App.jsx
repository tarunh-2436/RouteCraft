import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import MapComponent from "./components/MapComponent";
import DepotInput from "./components/DepotInput";
import DeliveryPointsInput from "./components/DeliveryPointsInput";
import OptimalRoutePage from "./components/OptimalRoutePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import 'leaflet/dist/leaflet.css';


const App = () => {
  const [depot, setDepot] = useState(null);
  const [deliveryPoints, setDeliveryPoints] = useState([]);

  const handleMapClick = (latlng) => {
    if (!depot) {
      setDepot(latlng); // Set depot if not already set
    } else {
      setDeliveryPoints([...deliveryPoints, latlng]); // Add delivery point
    }
  };

  return (
    <Router>
      <div className="flex flex-col items-center bg-gray-100 min-h-screen overflow-auto">
        {/* Header */}
        <header className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 shadow-md">
          <nav className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">Route Planner</h1>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:underline text-lg">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:underline text-lg">
                  Map
                </Link>
              </li>
              <li>
                <Link to="/optimal-route" className="hover:underline text-lg">
                  Optimal Route
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:underline text-lg">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:underline text-lg">
                  Signup
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/map"
            element={
              <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-[90vw] h-[85vh]">
                <div className="flex flex-col lg:flex-row gap-6 h-full">
                  {/* Map Section */}
                  <div className="flex-1 h-full">
                    <MapComponent
                      depot={depot}
                      deliveryPoints={deliveryPoints}
                      onMapClick={handleMapClick}
                    />
                  </div>

                  {/* Input Section */}
                  <div className="flex flex-col w-full lg:w-[30%] space-y-6">
                    <DepotInput depot={depot} setDepot={setDepot} />
                    <DeliveryPointsInput
                      deliveryPoints={deliveryPoints}
                      setDeliveryPoints={setDeliveryPoints}
                      depot={depot}
                    />
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/optimal-route"
            element={
              <OptimalRoutePage depot={depot} deliveryPoints={deliveryPoints} />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>

        {/* Footer */}
        <footer className="w-full bg-gray-800 text-white py-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Route Planner. All rights reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;