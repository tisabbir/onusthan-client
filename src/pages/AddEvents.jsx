import { useState } from "react";
import { Calendar, MapPin, User, Clock, FileText, Users } from "lucide-react";
import Navbar from "../components/Navbar";


const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    organizer: "",
    date: "",
    time: "",
    location: "",
    description: "",
    attendeeCount: 0,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Update form on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "attendeeCount" ? parseInt(value) || 0 : value,
    }));
  };

  // Submit the form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://onusthan-server.onrender.com/api/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            ...formData,
            dateTime: `${formData.date}T${formData.time}`,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to create event");

      // Success
      setMessage("Event created successfully! 🎉");
      setFormData({
        title: "",
        organizer: "",
        date: "",
        time: "",
        location: "",
        description: "",
        attendeeCount: 0,
      });

    } catch (err) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Create Your <span className="text-purple-600">Event</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Share your passion with the world. Create an amazing event that brings people together.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-semibold mb-6">Event Details</h2>

            {message && (
              <div className="text-center mb-4 text-sm px-4 py-2 rounded-md 
                text-white font-medium
                bg-green-600/90"
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
                    <FileText className="w-4 h-4" /> Event Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded-md shadow-sm"
                    placeholder="Enter event title"
                    required
                  />
                </div>

                {/* Organizer */}
                <div>
                  <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
                    <User className="w-4 h-4" /> Organizer Name
                  </label>
                  <input
                    type="text"
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded-md shadow-sm"
                    placeholder="Enter organizer name"
                    required
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Event Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded-md shadow-sm"
                    required
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> Event Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded-md shadow-sm"
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded-md shadow-sm"
                    placeholder="Enter event location"
                    required
                  />
                </div>

                {/* Attendee Count */}
                <div>
                  <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
                    <Users className="w-4 h-4" /> Initial Attendees
                  </label>
                  <input
                    type="number"
                    name="attendeeCount"
                    value={formData.attendeeCount}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded-md shadow-sm"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Event Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md shadow-sm"
                  placeholder="Describe your event in detail..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md shadow hover:opacity-90 transition"
              >
                {loading ? "Submitting..." : "Create Event"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;