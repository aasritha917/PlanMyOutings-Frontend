import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, Star } from "lucide-react";

export default function Movies({ darkMode }) {
  const [showMovies, setShowMovies] = useState(false); // 👈 state for dropdown

  const siteBg = darkMode ? "#0f172a" : "#e0f2fe";
  const textColor = darkMode ? "#f9fafb" : "#1f2937";

  const moviesData = [
    {
      title: "Inception",
      genre: "Sci-Fi, Thriller",
      year: 2010,
      description:
        "A skilled thief navigates dreams to plant ideas in people’s minds.",
      image:
        "https://lumiere-a.akamaihd.net/v1/images/alladin_600x450_moviespg_mobile_7_d097b99b.jpeg?region=0,0,600,450",
      rating: 4.8,
    },
    {
      title: "The Dark Knight",
      genre: "Action, Crime, Drama",
      year: 2008,
      description:
        "Batman faces a criminal mastermind who wants to plunge Gotham into chaos.",
      image:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
      rating: 5.0,
    },
    {
      title: "Forrest Gump",
      genre: "Drama, Romance",
      year: 1994,
      description:
        "Life is like a box of chocolates for the kind-hearted Forrest.",
      image:
        "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
      rating: 4.7,
    },
    {
      title: "The Matrix",
      genre: "Sci-Fi, Action",
      year: 1999,
      description:
        "A hacker discovers a shocking truth about reality and a hidden war.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-9TDmDP-XINSNtUsDq-Ban8OvSmcqvHJoFw&s",
      rating: 4.9,
    },
    {
      title: "Avengers: Endgame",
      genre: "Action, Sci-Fi",
      year: 2019,
      description:
        "The Avengers assemble to restore balance after Thanos’ snap.",
      image:
        "https://images.thedirect.com/media/article_full/avengers-multiverse-saga-phase.jpg",
      rating: 4.6,
    },
    {
      title: "Interstellar",
      genre: "Sci-Fi, Drama",
      year: 2014,
      description: "A man travels through space and time to save humanity.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZgarY79EPQu_BBe86NdqmVxRhgH0N6AgLEA&s",
      rating: 4.9,
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
                ? "bg-gradient-to-r from-yellow-500 to-orange-400 text-black"
                : "bg-black text-white"
            }`}
          >
            🎬 Explore the World of Cinema
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Dive Into The Magic Of{" "}
            <span
              className={`bg-clip-text text-transparent ${
                darkMode
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                  : "bg-gradient-to-r from-blue-500 to-purple-500"
              }`}
            >
              Movies
            </span>
          </h1>

          <p className="text-lg opacity-80 max-w-md">
            Iconic films. Unforgettable stories. Pure cinema experience.
          </p>

          <motion.button
            className="mt-6 flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold shadow-lg bg-white text-black"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMovies((prev) => !prev)} // 👈 toggle dropdown
          >
            <PlayCircle /> {showMovies ? "Hide Movies" : "Explore Movies"}
          </motion.button>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex justify-center items-center mt-10 md:mt-0 "
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            
            src="./src/assets/images/movies.jpg"
            alt="Movie Scene"
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

      {/* Movie Section Dropdown */}
      <AnimatePresence>
        {showMovies && (
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
                {[...moviesData, ...moviesData].map((movie, i) => (
                  <motion.div
                    key={i}
                    className={`flex-shrink-0 w-80 md:w-96 lg:w-[22rem] rounded-2xl shadow-xl backdrop-blur-lg border ${
                      darkMode
                        ? "bg-[#1b2430]/80 border-[#facc15]/10"
                        : "bg-white/80 border-gray-300/40"
                    } transition-all hover:scale-105 cursor-pointer`}
                    whileHover={{
                      boxShadow: "0 0 35px rgba(255,215,0,0.5)",
                    }}
                  >
                    <img
                      src={movie.image}
                      className="h-52 md:h-60 w-full object-cover rounded-t-2xl"
                      alt={movie.title}
                    />

                    <div className="p-3 md:p-4 space-y-1">
                      <h2 className="font-bold text-sm md:text-base">
                        {movie.title}
                      </h2>
                      <p className="text-xs md:text-sm opacity-75">
                        {movie.genre}
                      </p>

                      <div className="flex items-center gap-1 text-yellow-400 pt-1">
                        <Star size={16} fill="gold" stroke="gold" />
                        <span className="text-sm font-semibold">
                          {movie.rating}
                        </span>
                        <span className="text-xs opacity-60 ml-2">
                          {movie.year}
                        </span>
                      </div>

                      <p className="text-xs opacity-70 line-clamp-2">
                        {movie.description}
                      </p>

                      <div className="mt-2">
                        <button
                          className={`w-full text-xs md:text-sm py-2 rounded-full font-semibold shadow-sm ${
                            darkMode
                              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
                              : "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                          }`}
                        >
                          View Details
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
