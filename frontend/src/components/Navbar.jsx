import React from "react";
import { ShoppingCart } from "lucide-react";

export default function Navbar({ cartItems }) {
  return (
    <nav className="flex justify-between items-center py-4 px-8 md:px-16">
      <div className="text-2xl font-bold text-blue-600">Mealify</div>

      <div className="hidden md:flex space-x-8">
        <a href="#" className="text-gray-800 hover:text-blue-600">
          Home
        </a>
        <a href="#" className="text-gray-800 hover:text-blue-600">
          Menu
        </a>
        <a href="#" className="text-gray-800 hover:text-blue-600">
          Service
        </a>
        <a href="#" className="text-gray-800 hover:text-blue-600">
          About us
        </a>
        <a href="#" className="text-gray-800 hover:text-blue-600">
          Contacts
        </a>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <ShoppingCart className="text-gray-800" />
          {cartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItems}
            </span>
          )}
        </div>
        <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
          Sign in
        </button>
      </div>
    </nav>
  );
}