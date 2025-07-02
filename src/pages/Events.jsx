import { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, Clock, Search } from 'lucide-react';
import Navbar from '../components/Navbar';

const API = "https://onusthan-server.onrender.com/api/events";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  // Fetch events from your backend
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (searchTerm) query.append("search", searchTerm);
        if (filterOption !== "all") query.append("filter", filterOption);

        const response = await fetch(`${API}?${query.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events", err);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [searchTerm, filterOption]);

  // Join event 🟢
  const handleJoin = async (id) => {
    try {
      const res = await fetch(`${API}/join/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Joined successfully!");
        // Optional: re-fetch events (to update attendee count)
        setEvents(prev =>
          prev.map(event =>
            event._id === id ? { ...event, attendeeCount: event.attendeeCount + 1 } : event
          )
        );
      } else {
        alert(data.message || "Could not join.");
      }
    } catch (err) {
      alert("Error joining event");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover <span className="text-purple-600">Events</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find amazing events and join the community.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row justify-center gap-4 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          <select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            className="w-full md:w-48 px-4 py-2 rounded-md border shadow-sm bg-white text-gray-700"
          >
            <option value="all">All Events</option>
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="last-week">Last Week</option>
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
          </select>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-24 text-lg text-gray-500">Loading events...</div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-lg shadow-lg p-6 border hover:shadow-2xl transition duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-1">{event.title}</h2>
                <p className="text-sm text-gray-500 mb-4">by {event.createdBy}</p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.dateTime).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(event.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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

                <button
                  onClick={() => handleJoin(event._id)}
                  className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition shadow"
                >
                  Join Event
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 text-lg">
            No events found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;