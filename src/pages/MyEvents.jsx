import { useEffect, useState } from "react";
import {
  Calendar, MapPin, Users, Clock,
  Edit, Trash2, X
} from "lucide-react";
import Navbar from "../components/Navbar";

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const token = localStorage.getItem("token");

  const fetchMyEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://onusthan-server.onrender.com/api/myevents", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setMyEvents(data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://onusthan-server.onrender.com/api/myevents/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        alert("✅ Event deleted");
        fetchMyEvents();
      } else {
        const data = await res.json();
        alert(data.message || "❌ Failed to delete");
      }
    } catch (err) {
      alert("❌ Error deleting event");
    }
  };

  // === 🔄 Update: Open Modal ===
  const handleUpdate = (event) => {
    setCurrentEvent({
      ...event,
      date: event.dateTime?.slice(0, 10),
      time: new Date(event.dateTime)?.toISOString()?.slice(11, 16)
    });
    setShowModal(true);
  };

  // === 🔄 Update: Submit Updated Event ===
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://onusthan-server.onrender.com/api/myevents/${currentEvent._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: currentEvent.title,
          location: currentEvent.location,
          description: currentEvent.description,
          dateTime: `${currentEvent.date}T${currentEvent.time}`
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Event updated successfully");
        setShowModal(false);
        fetchMyEvents();
      } else {
        alert(data.message || "❌ Failed to update event");
      }
    } catch (err) {
      alert("❌ Error updating event");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            My <span className="text-purple-600">Events</span>
          </h1>
          <p className="text-xl text-gray-600">Manage your created events.</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading events...</div>
        ) : myEvents.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Yet</h3>
            <p className="text-gray-500 mb-4">Create your first event now.</p>
            <a
              href="/add-event"
              className="inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Create Event
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myEvents.map((event) => {
              const date = new Date(event.dateTime);
              return (
                <div
                  key={event._id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">{event.title}</h2>
                  <p className="text-sm text-gray-500 mb-4">Created by you</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{date.toLocaleDateString()}</span></div>
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{event.location}</span></div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>{event.attendeeCount} attendees</span></div>
                    <p className="pt-2 text-gray-700">{event.description}</p>
                  </div>

                  <div className="flex gap-2 mt-5">
                    <button onClick={() => handleUpdate(event)} className="flex-1 flex items-center gap-1 px-4 py-2 border rounded-md hover:bg-gray-100">
                      <Edit className="w-4 h-4" /> Update
                    </button>
                    <button onClick={() => handleDelete(event._id)} className="flex-1 flex items-center gap-1 px-4 py-2 border border-red-500 text-red-600 rounded-md hover:bg-red-50">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ✅ Update Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-md w-full max-w-lg p-6 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-center mb-4">Update Event</h3>

              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={currentEvent?.title}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, title: e.target.value })
                  }
                  required
                  placeholder="Event title"
                  className="w-full border px-3 py-2 rounded"
                />

                <input
                  type="text"
                  name="location"
                  value={currentEvent?.location}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, location: e.target.value })
                  }
                  required
                  placeholder="Location"
                  className="w-full border px-3 py-2 rounded"
                />

                <textarea
                  name="description"
                  value={currentEvent?.description}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, description: e.target.value })
                  }
                  rows={3}
                  required
                  placeholder="Event description"
                  className="w-full border px-3 py-2 rounded"
                ></textarea>

                <div className="flex gap-4">
                  <input
                    type="date"
                    name="date"
                    value={currentEvent?.date}
                    onChange={(e) =>
                      setCurrentEvent({ ...currentEvent, date: e.target.value })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="time"
                    name="time"
                    value={currentEvent?.time}
                    onChange={(e) =>
                      setCurrentEvent({ ...currentEvent, time: e.target.value })
                    }
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;