import React from "react";
import { Twitter, Instagram, Facebook } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row py-8 px-8 md:px-16 items-center">
      {/* Left Section */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Enjoy Your <br />
          Delicious <span className="text-blue-600">Meals</span>
        </h1>
        <p className="text-gray-600 mb-8 max-w-md">
          We will satisfy your hunger with delicious food and ensure a quick
          delivery to your doorstep.
        </p>
        <button className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700">
          Order now
        </button>

        <div className="flex space-x-4 mt-8">
          <a href="#" className="text-gray-600 hover:text-blue-600">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            <Facebook size={20} />
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 relative flex justify-center">
        <div className="bg-blue-500 rounded-full w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
          <img
            src="/api/placeholder/400/400"
            alt="Delivery person"
            className="max-w-full h-auto object-cover transform scale-110"
          />
        </div>

        {/* Testimonial Box */}
        <div className="absolute bottom-6 right-8 bg-white p-4 rounded-lg shadow-md max-w-xs">
          <div className="text-blue-600 text-xl mb-2">"</div>
          <p className="text-gray-700 text-sm">
            Fast delivery and friendly staff. The food was hot and very tasty.
          </p>
          <div className="text-blue-600 text-xl text-right">"</div>
        </div>

        {/* Contact Info Box */}
        <div className="absolute top-1/4 left-4 bg-white p-3 rounded-lg shadow-md">
          <p className="text-sm text-gray-700">Phone number:</p>
          <p className="text-sm font-bold">+1 (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
}