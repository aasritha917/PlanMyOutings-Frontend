import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard({ darkMode, user, setAuthModalOpen }) {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const features = [
    { emoji: "📍", label: "Explore Places Nearby" },
    { emoji: "🤝", label: "Plan with Friends" },
    { emoji: "🗳️", label: "Polls for Best Spot" },
    { emoji: "📆", label: "Track Outing Dates" },
    { emoji: "🚗", label: "Smart Travel Routes" },
    { emoji: "🥳", label: "Perfect Hangout Management" },
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  const handleCreatePlan = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/checkAuth",
      {
        method: "GET",
        credentials: "include", // send cookies
      }
    );

    if (res.status === 401) {
      setAuthModalOpen(true);
      return;
    }

    navigate("/create");
  } catch (err) {
    console.error(err);
    toast.error("Unable to verify login. Please try again.");
    setAuthModalOpen(true);
  }
};

  const containerBg = darkMode
    ? "bg-[#0f172a] text-white before:bg-[radial-gradient(circle_at_50%_50%,rgba(100,255,218,0.03)_0%,transparent_80%)]"
    : "bg-[#e0f2fe] text-gray-800 before:bg-[radial-gradient(circle_at_50%_50%,rgba(100,255,218,0.03)_0%,transparent_80%)]";

  return (
    <div
      className={`relative min-h-screen flex flex-col px-6 md:px-20 py-16 overflow-hidden transition-colors duration-500 before:content-[''] before:absolute before:inset-0 before:pointer-events-none ${containerBg}`}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ top: "10%", left: "5%" }}
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ bottom: "10%", right: "5%" }}
          animate={{ x: [0, -100, 0], y: [0, -50, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Heading */}
      <motion.div
        className="w-full text-center md:text-left mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Plan Your Outings <br className="hidden md:block" />
            Discover. Organize. Enjoy.
          </span>
        </h1>
        <p className={`text-base md:text-lg mt-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Explore beaches, waterfalls, restaurants, movies & more. Plan with friends and enjoy stress-free outings.
        </p>
      </motion.div>

      {/* Features + Image */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Features */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="grid grid-cols-2 gap-4 mt-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className={`relative flex items-center gap-3 py-4 px-5 rounded-2xl shadow-xl cursor-pointer backdrop-blur-md border transition-all ${
                  darkMode ? "bg-white/5 border-white/10" : "bg-white/80 border-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <span className="text-2xl md:text-3xl">{feature.emoji}</span>
                <span className="text-sm md:text-base font-semibold">{feature.label}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate("/discover")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold"
            >
              Discover Places
            </button>
            <button
              onClick={handleCreatePlan}
              className="px-6 py-3 rounded-xl font-bold border-2"
              style={{
                background: darkMode ? "rgba(255,255,255,0.05)" : "#f3f4f6",
                borderColor: darkMode ? "rgba(255,255,255,0.2)" : "#d1d5db",
              }}
            >
              Create Plan
            </button>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
        >
          <motion.img
            src="https://media.istockphoto.com/id/655767590/photo/friends-meeting.jpg?s=612x612&w=0&k=20&c=dff2RMNV2cFqja-xjXP_-DZEpag3MfiYrEzdyCmuASM="
            alt="Outing"
            className="w-full max-w-md rounded-3xl shadow-2xl object-cover border-4"
            style={{ transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)` }}
          />
        </motion.div>
      </div>
    </div>
  );
}
