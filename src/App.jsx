import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

// ✅ Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Restaurants from "./pages/Restaurants";
import AllRestaurants from "./components/AllRestarents";
import Movies from "./pages/Movies";
import Temples from "./pages/Temples";
import Beaches from "./pages/Beaches";
import Waterfalls from "./pages/Waterfalls";
import Parks from "./pages/Parks";

import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import CreateGroup from "./pages/CreateGroup";
import MyTrip from "./pages/MyTrip";
import MyEvents from "./pages/MyEvents"; // ✅ New page

import AuthModal from "./pages/Register";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const siteBg = darkMode ? "#0f172a" : "#e0f2fe";

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/" replace />;
  };

  useEffect(() => {
    document.body.style.overflow = sidebarOpen || authModalOpen ? "hidden" : "";
  }, [sidebarOpen, authModalOpen]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div
        className="min-h-screen transition-colors relative"
        style={{ background: siteBg, color: darkMode ? "#f3f4f6" : "#1f2937" }}
      >
        {/* Navbar */}
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user={user}
          setUser={setUser}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setAuthModalOpen={setAuthModalOpen}
        />

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                darkMode={darkMode}
                user={user}
                setAuthModalOpen={setAuthModalOpen}
              />
            }
          />

          <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
          <Route path="/restaurants" element={<Restaurants darkMode={darkMode} />} />
          <Route path="/all-restaurants" element={<AllRestaurants darkMode={darkMode} />} />
          <Route path="/movies" element={<Movies darkMode={darkMode} />} />
          <Route path="/temples" element={<Temples darkMode={darkMode} />} />
          <Route path="/beaches" element={<Beaches darkMode={darkMode} />} />
          <Route path="/waterfalls" element={<Waterfalls darkMode={darkMode} />} />
          <Route path="/parks" element={<Parks darkMode={darkMode} />} />

          {/* Protected Pages */}
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateGroup darkMode={darkMode} user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mytrip"
            element={
              <ProtectedRoute>
                <MyTrip darkMode={darkMode} user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myevents" // ✅ MyEvents route
            element={
              <ProtectedRoute>
                <MyEvents darkMode={darkMode} user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile darkMode={darkMode} user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings darkMode={darkMode} user={user} />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {authModalOpen && (
          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            onLogin={(loggedUser) => {
              setUser(loggedUser);
              setAuthModalOpen(false);
            }}
          />
        )}

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
}
