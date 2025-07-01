import { Calendar, Home, Plus, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // make sure the path is correct

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleLogout = () => {
    logout();
    navigate("/");  // Navigate to homepage or login
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2">
            <img src="/logo-only.png" alt="Logo" className="w-6" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">
              Onusthan
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition font-medium"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/events"
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition font-medium"
            >
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </Link>
            <Link
              to="/add-event"
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </Link>
            <Link
              to="/my-events"
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition font-medium"
            >
              <User className="w-4 h-4" />
              <span>My Events</span>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="relative flex items-center space-x-4">
            {!user ? (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Sign In
              </Link>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="focus:outline-none"
                >
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-purple-500 object-cover"
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 text-sm text-gray-800 border-b">
                      {user.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;