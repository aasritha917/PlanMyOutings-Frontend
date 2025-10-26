import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateGroup({ user, darkMode }) {
  const navigate = useNavigate();

  const [groupData, setGroupData] = useState({
    name: "",
    description: "",
  });
  const [members, setMembers] = useState([]);
  const [memberInput, setMemberInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setGroupData({ ...groupData, [e.target.id]: e.target.value });
  };

  const handleAddMember = () => {
    if (!memberInput.trim()) return;
    if (members.includes(memberInput)) {
      toast.error("User already added!");
      return;
    }
    setMembers([...members, memberInput]);
    setMemberInput("");
  };

  const handleRemoveMember = (email) => {
    setMembers(members.filter((m) => m !== email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!groupData.name.trim()) {
      toast.error("Group name is required!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/groups",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // ✅ send cookies automatically
          body: JSON.stringify({
            ...groupData,
            owner: user._id,
            members: members.map((m) => ({
              user: m,
              role: "member",
            })),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to create group");
        return;
      }

      toast.success("🎉 Group created successfully!");
      setGroupData({ name: "", description: "" });
      setMembers([]);

      setTimeout(() => navigate("/mytrip"), 700);
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition duration-500 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl shadow-xl p-8 border backdrop-blur-md transition duration-500 ${
          darkMode
            ? "bg-white/10 border-white/20 text-white"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Plan a New Trip ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-semibold mb-1 block">Group Name *</label>
            <input
              id="name"
              value={groupData.name}
              onChange={handleChange}
              placeholder="Goa Weekend Hangout 🏖️"
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 transition ${
                darkMode
                  ? "bg-gray-800 text-white focus:ring-sky-400"
                  : "bg-gray-50 text-gray-900 focus:ring-blue-400"
              }`}
              required
            />
          </div>

          <div>
            <label className="font-semibold mb-1 block">Description</label>
            <textarea
              id="description"
              rows={3}
              value={groupData.description}
              onChange={handleChange}
              placeholder="Plan all travel details here..."
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 transition resize-none ${
                darkMode
                  ? "bg-gray-800 text-white focus:ring-purple-400"
                  : "bg-gray-50 text-gray-900 focus:ring-blue-400"
              }`}
            />
          </div>

          <div>
            <label className="font-semibold">Add Members</label>
            <div className="flex gap-2 mt-1">
              <input
                value={memberInput}
                onChange={(e) => setMemberInput(e.target.value)}
                placeholder="Enter friend email"
                className={`flex-1 px-3 py-2 rounded-lg focus:ring-2 transition ${
                  darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-50 text-gray-900"
                }`}
              />
              <button
                type="button"
                onClick={handleAddMember}
                className="px-3 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {members.map((m) => (
                <span
                  key={m}
                  className={`px-3 py-1 rounded-full flex items-center gap-2 text-sm ${
                    darkMode ? "bg-gray-700 text-white" : "bg-gray-200"
                  }`}
                >
                  {m}
                  <button
                    onClick={() => handleRemoveMember(m)}
                    className="text-red-400 hover:text-red-600 font-bold"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:scale-105 transition-all shadow-lg"
          >
            {loading ? "Creating..." : "🚀 Create Trip Group"}
          </button>
        </form>
      </div>
    </div>
  );
}
