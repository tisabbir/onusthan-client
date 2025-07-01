import { Calendar, Home, Plus, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2">
            <img src="logo-only.png" alt="" className="w-6" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">
              Onusthan
            </span>
          </div>

          {/* Nav link */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </a>
            <a
              href="/events"
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </a>
            <a
              href="/add-event"
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </a>
            <a
              href="/my-events"
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              <User className="w-4 h-4" />
              <span>My Events</span>
            </a>
          </div>

         
          <div className="flex items-center">
            <button
              className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
