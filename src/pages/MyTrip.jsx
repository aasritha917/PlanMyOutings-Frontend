import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function MyTrip({ user, darkMode }) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingGroup, setEditingGroup] = useState(null);
  const [editData, setEditData] = useState({ name: "", description: "" });
  const [showEventForm, setShowEventForm] = useState(null);
  const [eventData, setEventData] = useState({ title: "", description: "", date: "", location: "" });

  const navigate = useNavigate();

  // Helper to get auth headers
  const getAuthHeaders = () => {
    const token =
      document.cookie.split("; ").find((c) => c.startsWith("accessToken="))?.split("=")[1] ||
      localStorage.getItem("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch user groups
  const fetchGroups = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/groups", {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch groups");
      setGroups(data);
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Could not load groups. Please login again.");
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchGroups();
  }, [user]);

  // Event form handlers
  const toggleEventForm = (groupId) => {
    setShowEventForm(showEventForm === groupId ? null : groupId);
    setEventData({ title: "", description: "", date: "", location: "" });
  };
  const handleEventChange = (e) => setEventData({ ...eventData, [e.target.id]: e.target.value });

  const createEvent = async (groupId) => {
    if (!eventData.title.trim()) return toast.error("Event title is required!");
    try {
      const res = await fetch(`http://localhost:5000/api/groups/${groupId}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        credentials: "include",
        body: JSON.stringify(eventData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create event");

      toast.success("Event created successfully!");
      setEventData({ title: "", description: "", date: "", location: "" });
      setShowEventForm(null);
      navigate("/myevents");
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Server error! Please login again.");
    }
  };

  // Group CRUD handlers
  const handleDelete = async (groupId) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/groups/${groupId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      toast.success("Group deleted successfully!");
      setGroups(groups.filter((g) => g._id !== groupId));
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleEdit = (group) => {
    setEditingGroup(group._id);
    setEditData({ name: group.name, description: group.description || "" });
  };

  const saveEdit = async () => {
    if (!editData.name.trim()) return toast.error("Group name cannot be empty");
    try {
      const res = await fetch(`http://localhost:5000/api/groups/${editingGroup}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        credentials: "include",
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      toast.success("Group updated successfully!");
      setGroups(groups.map((g) => (g._id === editingGroup ? { ...g, ...editData } : g)));
      setEditingGroup(null);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen text-gray-500">Loading your trips...</div>;

  return (
    <div className={`min-h-screen px-6 md:px-12 py-20 ${darkMode ? "bg-gray-900 text-white" : "bg-blue-50 text-gray-900"}`}>
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">My Trips / Groups</h1>
        <p className="text-lg md:text-xl text-gray-400">Here are the groups you created or joined</p>
      </div>

      {groups.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-16">You haven’t created or joined any groups yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {groups.map((group) => {
            const isOwner = group.owner?._id === user?.id || group.owner?._id === user?._id;
            return (
              <div key={group._id} className={`rounded-3xl p-8 flex flex-col justify-between shadow-xl border transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                {editingGroup === group._id ? (
                  <div className="flex flex-col gap-5">
                    <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} placeholder="Group Name" className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    <textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} placeholder="Description" rows={4} className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    <div className="flex justify-end gap-4 mt-4">
                      <button onClick={saveEdit} className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition">Save</button>
                      <button onClick={() => setEditingGroup(null)} className="px-5 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 transition">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-4">
                      <h2 className="text-2xl md:text-3xl font-bold">{group.name}</h2>
                      <p className="text-gray-400">{group.description || "No description"}</p>
                      <p className="text-sm mt-1">Members: {group.members.length}</p>
                      <p className="text-xs text-gray-400">Owner: {group.owner?.email || "Unknown"}</p>
                    </div>

                    <div className="mt-4">
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition mb-2" onClick={() => toggleEventForm(group._id)}>
                        {showEventForm === group._id ? "Cancel Event" : "Create Event"}
                      </button>

                      {showEventForm === group._id && (
                        <div className="flex flex-col gap-3 mt-3">
                          <input id="title" value={eventData.title} onChange={handleEventChange} placeholder="Event Title" className="p-2 border rounded w-full" />
                          <textarea id="description" value={eventData.description} onChange={handleEventChange} placeholder="Event Description" className="p-2 border rounded w-full" />
                          <input id="date" type="datetime-local" value={eventData.date} onChange={handleEventChange} className="p-2 border rounded w-full" />
                          <input id="location" value={eventData.location} onChange={handleEventChange} placeholder="Location" className="p-2 border rounded w-full" />
                          <button onClick={() => createEvent(group._id)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Create Event</button>
                        </div>
                      )}

                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-400">Created: {new Date(group.createdAt).toLocaleDateString()}</span>
                        <div className="flex gap-3">
                          {isOwner && (
                            <>
                              <button onClick={() => handleEdit(group)} className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">Edit</button>
                              <button onClick={() => handleDelete(group._id)} className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
