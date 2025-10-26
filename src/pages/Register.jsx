// AuthModal.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:5000";

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [activeTab, setActiveTab] = useState("signin");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint =
      activeTab === "signin"
        ? `${BASE_URL}/login`
        : `${BASE_URL}/register`;

    const payload =
      activeTab === "signin"
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ allows cookie auth
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "⚠️ Something went wrong");
        return;
      }

      if (activeTab === "signup") {
        toast.success("✅ Account created successfully! Please login.");
        setFormData({ name: "", email: "", password: "" });
        setActiveTab("signin");
      } else {
        toast.success("🎉 Login successful!");
        setFormData({ name: "", email: "", password: "" });
        onLogin(data.user);
        onClose();
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative z-10 w-full max-w-sm bg-[#111114]/90 rounded-2xl shadow-xl border border-[#2a2a2f] p-8">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-gray-200 text-center text-lg font-medium mb-4">
          {activeTab === "signin" ? "Welcome Back" : "Create Account"}
        </h2>

        <div className="flex mb-6 bg-[#19191e] rounded-xl border border-[#333] p-1">
          <button
            onClick={() => setActiveTab("signin")}
            className={`w-1/2 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "signin"
                ? "bg-[#0d0d12] text-white shadow-inner"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`w-1/2 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "signup"
                ? "bg-[#0d0d12] text-white shadow-inner"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {activeTab === "signup" && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Username</label>
              <input
                id="name"
                type="text"
                placeholder="coolplanner"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg bg-[#0e0e12] text-gray-100 border border-[#29292e] focus:border-blue-500 outline-none transition"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg bg-[#0e0e12] text-gray-100 border border-[#29292e] focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg bg-[#0e0e12] text-gray-100 border border-[#29292e] focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-400 hover:to-blue-400 transition shadow-md disabled:opacity-50"
          >
            {loading
              ? activeTab === "signin"
                ? "Signing In..."
                : "Creating Account..."
              : activeTab === "signin"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          {activeTab === "signin" ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === "signin" ? "signup" : "signin")}
            className="text-indigo-400 hover:text-indigo-300 transition"
          >
            {activeTab === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
