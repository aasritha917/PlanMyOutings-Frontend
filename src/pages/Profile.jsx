// Profile.jsx
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Profile({ user, darkMode }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    location: "",
    preferences: { mood: "", favoriteCategory: "" },
  });
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);

  const userId = user?._id;

  // Fetch Profile Data
  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/User/${userId}`, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setProfile({
            name: data.name || "",
            email: data.email || "",
            location: data.location || "",
            preferences: data.preferences || { mood: "", favoriteCategory: "" },
          });
        } else {
          toast.error(data.message || "Failed to fetch profile", { autoClose: 3000 });
        }
      } catch (error) {
        toast.error("Server error while fetching profile", { autoClose: 3000 });
        console.error(error);
      }
    };

    fetchProfile();
  }, [userId]);

  // Fetch Availability
  useEffect(() => {
    if (!userId) return;

    const fetchAvailability = async () => {
      try {
        const res = await fetch(`http://localhost:5000/${userId}/availability`, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setAvailability(data);
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    fetchAvailability();
  }, [userId]);

  // Handlers
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id in profile.preferences) {
      setProfile({ ...profile, preferences: { ...profile.preferences, [id]: value } });
    } else {
      setProfile({ ...profile, [id]: value });
    }
  };

  const handleAvailabilityChange = (index, value) => {
    const updated = [...availability];
    updated[index] = value;
    setAvailability(updated);
  };

  const addAvailability = () => setAvailability([...availability, ""]);
  const removeAvailability = (index) => setAvailability(availability.filter((_, i) => i !== index));

  const updateProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/UpdateUser/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...profile, availability }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "✅ Profile updated successfully!", { autoClose: 3000 });
        setEditable(false);
      } else {
        toast.error(data.message || "⚠️ Failed to update profile", { autoClose: 3000 });
      }
    } catch (error) {
      toast.error("⚠️ Server error while updating profile", { autoClose: 3000 });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const goToDashboard = () => navigate("/dashboard");

  // Styles for dark/light mode
  const bgColor = darkMode ? "bg-gray-900" : "bg-gray-50";
  const cardColor = darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-200";
  const hoverShadow = darkMode ? "hover:shadow-lg hover:shadow-cyan-500/50" : "hover:shadow-lg hover:shadow-blue-400/30";


   return (
  <div className={`${bgColor} min-h-screen transition-colors duration-500 py-32 px-4 md:px-8`}>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />

    <div className="max-w-4xl mx-auto">
      {/* Header with more top space */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-4">
        <h1 className="text-4xl font-bold mt-12 md:mt-0">My Profile</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setEditable(!editable)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            {editable ? "Cancel" : "Edit Profile"}
          </button>
          <button
            onClick={goToDashboard}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            ✖
          </button>
        </div>
      </div>
 


        {/* Profile Card */}
        <div className={`p-8 rounded-3xl shadow-2xl transform transition-all duration-300 ${cardColor} ${hoverShadow} border ${borderColor}`}>
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                id="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!editable}
                className={`w-full px-4 py-2 rounded-xl border ${borderColor} ${
                  editable ? "bg-gray-50 text-gray-900" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={profile.email}
                disabled
                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              id="location"
              value={profile.location}
              onChange={handleChange}
              disabled={!editable}
              className={`w-full px-4 py-2 rounded-xl border ${borderColor} ${
                editable ? "bg-gray-50 text-gray-900" : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Mood</label>
              <input
                type="text"
                id="mood"
                value={profile.preferences.mood}
                onChange={handleChange}
                disabled={!editable}
                className={`w-full px-4 py-2 rounded-xl border ${borderColor} ${
                  editable ? "bg-gray-50 text-gray-900" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Favorite Category</label>
              <input
                type="text"
                id="favoriteCategory"
                value={profile.preferences.favoriteCategory}
                onChange={handleChange}
                disabled={!editable}
                className={`w-full px-4 py-2 rounded-xl border ${borderColor} ${
                  editable ? "bg-gray-50 text-gray-900" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              />
            </div>
          </div>

          {/* Availability */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Availability</label>
            {availability.map((slot, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
                <input
                  type="text"
                  value={slot}
                  onChange={(e) => handleAvailabilityChange(index, e.target.value)}
                  disabled={!editable}
                  className={`flex-1 px-3 py-2 rounded-xl border ${borderColor} ${
                    editable ? "bg-gray-50 text-gray-900" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                />
                {editable && (
                  <button
                    type="button"
                    onClick={() => removeAvailability(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {editable && (
              <button
                type="button"
                onClick={addAvailability}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
              >
                Add Availability
              </button>
            )}
          </div>

          {/* Save */}
          {editable && (
            <div className="text-right">
              <button
                onClick={updateProfile}
                disabled={loading}
                className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
