import React from "react";
import { Twitter, Instagram, Facebook } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase"; // make sure this path is correct

export default function HomePage() {
  const navigate = useNavigate();
  
  // Simplified navigation function - always directs to login
  const handleNavigation = () => {
    navigate("/login");
  };
  
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 min-h-screen flex flex-col text-white">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          Plan Your <span className="text-yellow-300">Optimal Routes</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
          Simplify your logistics with our easy-to-use route planner. Select your depot, add delivery points, and calculate the most efficient route in seconds.
        </p>
        <div className="flex space-x-6">
          <button
            onClick={handleNavigation}
            className="bg-yellow-300 text-blue-800 py-4 px-8 rounded-lg font-bold text-lg hover:bg-yellow-400 shadow-lg"
          >
            Get Started
          </button>
          <button
            onClick={handleNavigation}
            className="bg-white text-blue-800 py-4 px-8 rounded-lg font-bold text-lg hover:bg-gray-100 shadow-lg"
          >
            View Routes
          </button>
        </div>
      </header>
      {/* Features Section */}
      <section className="bg-white text-gray-800 py-16 px-6 md:px-16 rounded-t-3xl shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-blue-100 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-blue-800">Fast Delivery</h3>
            <p className="text-gray-700">
              Get your routes planned in seconds and ensure timely deliveries with our optimized solutions.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-blue-100 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-blue-800">Easy to Use</h3>
            <p className="text-gray-700">
              Our intuitive interface makes route planning simple and efficient for everyone.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-blue-100 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-blue-800">Cost Effective</h3>
            <p className="text-gray-700">
              Save time and resources by optimizing your delivery routes with ease.
            </p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center mt-auto">
        <p className="text-lg font-bold">Route Planner</p>
        <p className="text-sm text-gray-400">Plan your routes efficiently and save time.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <Twitter size={30} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <Instagram size={30} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <Facebook size={30} />
          </a>
        </div>
      </footer>
    </div>
  );
}