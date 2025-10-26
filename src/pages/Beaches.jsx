import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Beaches({ darkMode }) {
  const [showBeaches, setShowBeaches] = useState(false);

  const siteBg = darkMode ? "#0f172a" : "#e0f2fe";
  const textColor = darkMode ? "#f9fafb" : "#1f2937";

  const beachesData = [
    {
      name: "Bora Bora",
      location: "French Polynesia",
      description:
        "A tropical paradise known for crystal-clear waters and overwater bungalows.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZkD3jT3_PW53sYv67hW5s5MwE9E9NXCQeQg&s",
    },
    {
      name: "Copacabana Beach",
      location: "Rio de Janeiro, Brazil",
      description:
        "Famous for its vibrant atmosphere, beach sports, and iconic promenade.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnHg_fePRIHD44J2aO_g0NDUPEoMGpieML6g&s",
    },
    {
      name: "Bondi Beach",
      location: "Sydney, Australia",
      description:
        "Known for surfing, golden sands, and a lively coastal culture.",
      image:
        "https://assets.gqindia.com/photos/68c3cfa37a36df0543936440/16:9/w_2560%2Cc_limit/World's-most-beautiful-beaches.jpg",
    },
    {
      name: "Whitehaven Beach",
      location: "Whitsunday Island, Australia",
      description:
        "Renowned for its pristine white silica sands and turquoise waters.",
      image:
        "https://media.cntravellerme.com/photos/681878ff03a6976360d7a981/16:9/w_2560%2Cc_limit/1210194915",
    },
  ];

  return (
    <div
      className="relative min-h-screen transition-colors duration-500"
      style={{ backgroundColor: siteBg, color: textColor }}
    >
      {/* Hero Section */}
      <div className="min-h-[70vh] px-6 md:px-20 py-16 flex flex-col md:flex-row items-center justify-between md:gap-x-16 gap-y-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 space-y-6"
        >
          <div
            className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium shadow-md ${
              darkMode
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
                : "bg-black text-white"
            }`}
          >
            🏖️ Explore Stunning Beaches
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Discover The Magic Of{" "}
            <span
              className={`bg-clip-text text-transparent ${
                darkMode
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                  : "bg-gradient-to-r from-blue-500 to-purple-500"
              }`}
            >
              Beaches
            </span>
          </h1>

          <p className="text-lg opacity-80 max-w-md">
            White sands. Turquoise waters. Tropical paradise.
          </p>

          <motion.button
            className="mt-6 flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold shadow-lg bg-white text-black"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBeaches(!showBeaches)}
          >
            {showBeaches ? "Hide Beaches" : "Explore Beaches"}
          </motion.button>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex justify-center items-center mt-10 md:mt-0"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="./src/assets/images/beaches.jpg"
            alt="Beach Hero"
            className="rounded-2xl shadow-2xl object-cover max-h-100 md:max-h-126 w-full"
          />
        </motion.div>
      </div>

      {/* Dropdown Section */}
      <AnimatePresence>
        {showBeaches && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden py-12 px-6 max-w-[1600px] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {beachesData.map((beach, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className={`rounded-2xl shadow-xl backdrop-blur-lg border ${
                  darkMode
                    ? "bg-[#1b2430]/80 border-[#facc15]/10"
                    : "bg-white/80 border-gray-300/40"
                } transition-all cursor-pointer`}
              >
                <img
                  src={beach.image}
                  className="h-52 md:h-60 w-full object-cover rounded-t-2xl"
                  alt={beach.name}
                />

                <div className="p-3 md:p-4 space-y-1">
                  <h2 className="font-bold text-sm md:text-base">
                    {beach.name}
                  </h2>
                  <p className="text-xs md:text-sm opacity-75">
                    {beach.location}
                  </p>
                  <p className="text-xs opacity-70 line-clamp-3">
                    {beach.description}
                  </p>

                  <div className="mt-2">
                    <button
                      className={`w-full text-xs md:text-sm py-2 rounded-full font-semibold shadow-sm ${
                        darkMode
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
                          : "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                      }`}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
