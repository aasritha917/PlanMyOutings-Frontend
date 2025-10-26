// RestaurantsPreview.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Sample 5 restaurants for preview
const restaurantsList = [
  {
    name: "The Spice Villa",
    cuisine: "Indian",
    rating: 4.5,
    location: "MG Road",
    timing: "11 AM - 11 PM",
    bestDish: "Butter Chicken",
    description: "Authentic Indian flavors with a modern twist.",
    gradient: "from-orange-500 via-red-500 to-pink-500",
  },
  {
    name: "Ocean's Delight",
    cuisine: "Seafood",
    rating: 4.7,
    location: "Marine Drive",
    timing: "12 PM - 10 PM",
    bestDish: "Grilled Prawns",
    description: "Fresh seafood dishes with cozy ambiance.",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
  },
  {
    name: "Pasta Paradise",
    cuisine: "Italian",
    rating: 4.6,
    location: "City Center Mall",
    timing: "11 AM - 10 PM",
    bestDish: "Alfredo Pasta",
    description: "Delicious pasta and Italian specialties.",
    gradient: "from-green-500 via-emerald-500 to-lime-500",
  },
  {
    name: "Sushi World",
    cuisine: "Japanese",
    rating: 4.8,
    location: "Phoenix Market",
    timing: "1 PM - 11 PM",
    bestDish: "Salmon Nigiri",
    description: "Top-quality sushi and Japanese cuisine.",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
  },
  {
    name: "Burger Haven",
    cuisine: "Fast Food",
    rating: 4.4,
    location: "Main Street",
    timing: "10 AM - 1 AM",
    bestDish: "BBQ Cheeseburger",
    description: "Juicy burgers with fresh ingredients.",
    gradient: "from-yellow-500 via-orange-500 to-red-500",
  },
];

export default function RestaurantsPreview({ darkMode }) {
  const [highlighted, setHighlighted] = useState(restaurantsList[0]);
  const [secondHighlight, setSecondHighlight] = useState(restaurantsList[1]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);
  const navigate = useNavigate(); // for navigation

  const siteBg = darkMode ? "#0f172a" : "#e0f2fe";

  const handleViewMore = () => {
    navigate("/all-restaurants"); // Navigate to full Restaurants page
  };

  const RestaurantCard = ({ restaurant, index, onHover, isHighlighted }) => {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setRotateX(((e.clientY - centerY) / rect.height) * -15);
      setRotateY(((e.clientX - centerX) / rect.width) * 15);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };

    return (
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => {
          setHoveredCard(index);
          onHover(restaurant);
        }}
        className={`relative group cursor-pointer transform-gpu transition-all duration-500 ease-out ${
          isHighlighted ? "scale-105" : "scale-100 hover:scale-105"
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className={`relative overflow-hidden rounded-2xl shadow-2xl backdrop-blur-xl border transition-all duration-500 ${
            darkMode ? "bg-gray-800/50 border-white/10" : "bg-white/50 border-gray-200/50"
          } ${hoveredCard === index ? "shadow-2xl shadow-current" : ""}`}
        >
          <div
            className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent`}
          />
          <div className="relative p-6 md:p-8 flex flex-col gap-4" style={{ transform: "translateZ(50px)" }}>
            <div className="flex items-center justify-between">
              <h3 className={`text-2xl md:text-3xl font-extrabold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {restaurant.name}
              </h3>
              <span className="text-3xl animate-bounce group-hover:scale-125 transition-transform duration-300">
                {restaurant.rating >= 4.7 ? "🌟" : "✨"}
              </span>
            </div>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-lg italic`}>
              "{restaurant.description}"
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${darkMode ? "bg-white/10" : "bg-gray-100"}`}>
                🍽️ {restaurant.cuisine}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${darkMode ? "bg-white/10" : "bg-gray-100"}`}>
                ⭐ {restaurant.rating}
              </span>
            </div>
            <button
              className={`mt-4 px-6 py-3 rounded-xl font-bold text-white ${
                darkMode ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-600 hover:bg-blue-700"
              } transform transition-all duration-300 hover:scale-105`}
            >
              Reserve Table
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-16 overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: siteBg, color: darkMode ? "white" : "black" }}
    >
      <motion.h1
        className="text-4xl md:text-7xl font-extrabold text-center drop-shadow-2xl transition-colors duration-500 mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Best Places to Eat Nearby 🍽️
      </motion.h1>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {restaurantsList.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            restaurant={restaurant}
            index={index}
            onHover={index % 2 === 0 ? setHighlighted : setSecondHighlight}
            isHighlighted={restaurant === highlighted || restaurant === secondHighlight}
          />
        ))}
      </div>

      {/* View More Restaurants Button */}
      <div className="text-center mt-12">
        <motion.button
          onClick={handleViewMore} // Navigate to full page
          className={`px-8 py-3 font-bold rounded-lg shadow-2xl transition-all duration-300 ${
            darkMode ? "bg-green-700 hover:bg-green-800 text-white" : "bg-green-600 hover:bg-green-700 text-white"
          }`}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          View More Restaurants
        </motion.button>
      </div>
    </div>
  );
}
