import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:5000";

export default function MyEvents({ darkMode, user }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  // Fetch all events from all groups
  const fetchEvents = async () => {
    if (!user) return;
    try {
      setLoading(true);

      const groupsRes = await axios.get(`${BASE_URL}/api/groups`, {
        headers: { Authorization: `Bearer ${user.token}` },
        withCredentials: true,
      });

      const groups = Array.isArray(groupsRes.data)
        ? groupsRes.data
        : groupsRes.data.groups || [];

      const allEvents = [];

      for (const group of groups) {
        const res = await axios.get(`${BASE_URL}/api/groups/${group._id}/events`, {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true,
        });
        const groupEvents = Array.isArray(res.data) ? res.data : [];
        allEvents.push(
          ...groupEvents.map((event) => ({ ...event, group }))
        );
      }

      allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(allEvents);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  // Delete event
  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
        withCredentials: true,
      });
      toast.success("Event deleted successfully!");
      setEvents(events.filter((e) => e._id !== eventId));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error deleting event");
    }
  };

  // Start editing event
  const startEdit = (event) => {
    setEditingEventId(event._id);
    setEditData({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().slice(0, 16),
      location: event.location,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingEventId(null);
    setEditData({ title: "", description: "", date: "", location: "" });
  };

  // Save edited event
  const saveEdit = async (eventId) => {
    if (!editData.title.trim()) {
      toast.error("Event title is required");
      return;
    }
    try {
      const res = await axios.put(`${BASE_URL}/api/events/${eventId}`, editData, {
        headers: { Authorization: `Bearer ${user.token}` },
        withCredentials: true,
      });
      toast.success(res.data.message || "Event updated successfully");
      setEvents(
        events.map((e) =>
          e._id === eventId ? { ...e, ...res.data.event } : e
        )
      );
      cancelEdit();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error updating event");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
        <div className="text-center bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Authentication Required</h2>
          <p className="text-gray-600 dark:text-gray-300">Please login to view and manage your events</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className={`text-5xl font-extrabold mb-4 bg-gradient-to-r ${
            darkMode
              ? "from-blue-400 to-purple-400"
              : "from-blue-600 to-indigo-600"
          } bg-clip-text text-transparent`}>
            My Events
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 border-4 border-blue-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
            <p className={`mt-6 text-lg font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Loading your events...
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mb-8 shadow-lg">
              <svg className="w-16 h-16 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              No Events Yet
            </h3>
            <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Start creating events to see them here
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const canEdit =
                event.creator?._id === user._id ||
                event.group?.members?.some(
                  (m) => m.user.toString() === user._id && m.role === "admin"
                );

              return (
                <div
                  key={event._id}
                  className={`group relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
                    darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
                  }`}
                >
                  <div className="p-6">
                    {editingEventId === event._id ? (
                      <div className="flex flex-col gap-4">
                        <input
                          type="text"
                          placeholder="Event Title"
                          value={editData.title}
                          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                          className={`px-4 py-3 rounded-xl border-2 transition-all focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 focus:border-blue-500 outline-none ${
                            darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
                          }`}
                        />
                        <textarea
                          placeholder="Description"
                          value={editData.description}
                          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                          rows="3"
                          className={`px-4 py-3 rounded-xl border-2 transition-all focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 focus:border-blue-500 outline-none resize-none ${
                            darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
                          }`}
                        />
                        <input
                          type="datetime-local"
                          value={editData.date}
                          onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                          className={`px-4 py-3 rounded-xl border-2 transition-all focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 focus:border-blue-500 outline-none ${
                            darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                          }`}
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          value={editData.location}
                          onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                          className={`px-4 py-3 rounded-xl border-2 transition-all focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 focus:border-blue-500 outline-none ${
                            darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
                          }`}
                        />
                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={() => saveEdit(event._id)}
                            className="flex-1 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={cancelEdit}
                            className={`flex-1 px-5 py-3 font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg ${
                              darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                            }`}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {event.title}
                        </h3>
                        <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{event.description}</p>
                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          Date: {new Date(event.date).toLocaleString()}
                        </p>
                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          Location: {event.location}
                        </p>
                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          Group: {event.group?.name || "N/A"}
                        </p>
                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          Created By: {event.creator?.name || "N/A"}
                        </p>
                        {canEdit && (
                          <div className="flex gap-3 pt-4">
                            <button
                              onClick={() => startEdit(event)}
                              className="flex-1 px-4 py-2.5 bg-yellow-400 text-white font-semibold rounded-xl hover:bg-yellow-500 transition-all duration-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(event._id)}
                              className="flex-1 px-4 py-2.5 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
