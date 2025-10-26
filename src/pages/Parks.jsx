import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Parks({ darkMode }) {
  const [showParks, setShowParks] = useState(false); // 👈 toggle dropdown

  const siteBg = darkMode ? "#0f172a" : "#e0f2fe";
  const textColor = darkMode ? "#f9fafb" : "#1f2937";

  const parksData = [
    {
      name: "Rajiv Gandhi Park",
      location: "Hyderabad, Telangana",
      description:
        "A large urban park with walking trails, lakes, and lush greenery for family outings.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPm4SkVx9f0LP0QEArMCAq6k11IA4XevkaJw&s",
    },
    {
      name: "Infantry Park",
      location: "Pune, Maharashtra",
      description:
        "Popular for jogging, cycling, and picnics, surrounded by fountains and sculptures.",
      image:
        "https://img.freepik.com/free-photo/trees-park-sunset_1160-728.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      name: "Nehru Park",
      location: "New Delhi",
      description:
        "A peaceful park in the heart of Delhi, hosting cultural events and morning walkers.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStXCgdJGxYA1ZEYVA5w7AEPWUuS98cijPPSw&s",
    },
    {
      name: "Lodhi Garden",
      location: "New Delhi",
      description:
        "Historic gardens with tombs, walking paths, and greenery, perfect for leisure and photography.",
      image:
        "https://www.shutterstock.com/shutterstock/videos/1079918435/thumb/1.jpg?ip=x480",
    },
    {
      name: "Eco Park",
      location: "Kolkata, West Bengal",
      description:
        "A large urban park with themed gardens, cycling tracks, and boating facilities.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxeSEShloszLL_OmNStPbOQEYttcrgVB3JlA&s",
    },
  ];

  return (
    <div
      className="relative min-h-screen transition-colors duration-500"
      style={{ backgroundColor: siteBg, color: textColor }}
    >
      {/* Hero Section */}
      <div className="min-h-[80vh] px-6 md:px-20 py-16 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 space-y-6"
        >
          <div
            className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium shadow-md ${
              darkMode
                ? "bg-gradient-to-r from-green-400 to-blue-500 text-black"
                : "bg-black text-white"
            }`}
          >
            🌳 Explore the World's Parks
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Dive Into The Beauty Of{" "}
            <span
              className={`bg-clip-text text-transparent ${
                darkMode
                  ? "bg-gradient-to-r from-green-400 to-blue-500"
                  : "bg-gradient-to-r from-purple-500 to-blue-500"
              }`}
            >
              Parks
            </span>
          </h1>

          <p className="text-lg opacity-80 max-w-md">
            Lush greenery. Serene walks. Scenic escapes.
          </p>

          <motion.button
            className="mt-6 flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold shadow-lg bg-white text-black"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowParks((prev) => !prev)} // 👈 toggle visibility
          >
            {showParks ? "Hide Parks" : "Explore Parks"}
          </motion.button>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex justify-center items-center mt-10 md:mt-0"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="./src/assets/images/park.jpg"
            alt="Parks Hero"
            className="rounded-2xl shadow-2xl object-cover max-h-100 md:max-h-106 w-full"
          />
        </motion.div>
      </div>

      {/* Scroll Animations */}
      <style>
        {`
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scrollRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>

      {/* Dropdown Parks Section */}
      <AnimatePresence>
        {showParks && (
          <motion.div
            className="overflow-hidden py-12 px-6 max-w-[1600px] mx-auto space-y-12"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {[0, 1, 2].map((row) => (
              <div
                key={row}
                className="flex gap-8"
                style={{
                  animation: `${
                    row % 2 === 0 ? "scrollLeft" : "scrollRight"
                  } 40s linear infinite`,
                  width: "200%",
                }}
              >
                {[...parksData, ...parksData].map((park, i) => (
                  <motion.div
                    key={i}
                    className={`flex-shrink-0 w-80 md:w-96 lg:w-[22rem] rounded-2xl shadow-xl backdrop-blur-lg border ${
                      darkMode
                        ? "bg-[#1b2430]/80 border-green-400/20"
                        : "bg-white/80 border-gray-300/40"
                    } transition-all hover:scale-105 cursor-pointer`}
                    whileHover={{ boxShadow: "0 0 35px rgba(34,197,94,0.5)" }}
                  >
                    <img
                      src={park.image}
                      className="h-52 md:h-60 w-full object-cover rounded-t-2xl"
                      alt={park.name}
                    />

                    <div className="p-3 md:p-4 space-y-1">
                      <h2 className="font-bold text-sm md:text-base">
                        {park.name}
                      </h2>
                      <p className="text-xs md:text-sm opacity-75">
                        {park.location}
                      </p>

                      <p className="text-xs opacity-70 line-clamp-3">
                        {park.description}
                      </p>

                      <div className="mt-2">
                        <button
                          className={`w-full text-xs md:text-sm py-2 rounded-full font-semibold shadow-sm ${
                            darkMode
                              ? "bg-gradient-to-r from-green-400 to-blue-500 text-black"
                              : "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                          }`}
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
