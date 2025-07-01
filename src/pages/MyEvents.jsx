import { useEffect, useState } from "react";
import { Calendar, MapPin, Users, Clock, Edit, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch user-created events from backend
  const fetchMyEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://onusthan-server.onrender.com/api/myevents", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setMyEvents(data);
    } catch (err) {
      console.error("Failed to fetch your events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  // Delete event
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://onusthan-server.onrender.com/api/myevents/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();

      if (res.ok) {
        alert("✅ Event deleted");
        // Refresh list after deleting
        fetchMyEvents();
      } else {
        alert(data.message || "❌ Failed to delete");
      }
    } catch (err) {
      alert("❌ Error deleting event");
    }
  };

  // Update handler placeholder
  const handleUpdate = (id) => {
    alert(`Update functionality for event ID: ${id} would go here.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-purple-600">Events</span>
          </h1>
          <p className="text-xl text-gray-600">
            Manage all the events you’ve created.
          </p>
        </div>

        {/* No events */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading events...</div>
        ) : myEvents.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Yet</h3>
            <p className="text-gray-500 mb-4">
              You haven’t created any events yet.
            </p>
            <a
              href="/add-event"
              className="inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Create Your First Event
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
                  <p className="text-sm text-gray-500 mb-4">Your Event</p>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{event.attendeeCount} attendees</span>
                    </div>
                    <p className="pt-2 text-gray-700">{event.description}</p>
                  </div>

                  <div className="flex gap-2 mt-5">
                    <button
                      onClick={() => handleUpdate(event._id)}
                      className="flex-1 flex items-center justify-center gap-1 px-4 py-2 border rounded-md hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4" />
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="flex-1 flex items-center justify-center gap-1 px-4 py-2 border border-red-500 text-red-600 rounded-md hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;