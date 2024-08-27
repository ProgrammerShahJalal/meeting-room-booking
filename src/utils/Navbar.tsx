import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Placeholder for authentication and role-checking logic
  const isAuthenticated = true; // Replace with actual authentication check
  const isAdmin = false; // Replace with actual role-checking logic

  return (
    <nav className="bg-white text-black p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
            MRBS
          </span>
        </Link>
      </div>
      <div className="hidden md:flex space-x-4">
        <Link
          to="/"
          className="hover:text-green-500 active:text-purple-500 font-medium"
        >
          Home
        </Link>
        <Link
          to="/meeting-rooms"
          className="hover:text-green-500 active:text-purple-500 font-medium"
        >
          Meeting Rooms
        </Link>
        <Link
          to="/about-us"
          className="hover:text-green-500 active:text-purple-500 font-medium"
        >
          About Us
        </Link>
        <Link
          to="/contact-us"
          className="hover:text-green-500 active:text-purple-500 font-medium"
        >
          Contact Us
        </Link>
        {!isAuthenticated ? (
          <Link
            to="/login"
            className="hover:text-green-500 active:text-purple-500 font-medium"
          >
            Login
          </Link>
        ) : (
          <>
            {isAdmin ? (
              <Link
                to="/dashboard"
                className="hover:text-green-500 active:text-purple-500 font-medium"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/my-bookings"
                className="hover:text-green-500 active:text-purple-500 font-medium"
              >
                My Bookings
              </Link>
            )}
            <Link
              to="/logout"
              className="hover:text-green-500 active:text-purple-500 font-medium"
            >
              Logout
            </Link>
          </>
        )}
      </div>
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-black hover:text-green-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden absolute top-16 right-0 bg-white shadow-md z-50">
          <div className="flex flex-col items-center space-y-4 p-4">
            <Link to="/" className="hover:text-green-500" onClick={toggleMenu}>
              Home
            </Link>
            <Link
              to="/meeting-rooms"
              className="hover:text-green-500"
              onClick={toggleMenu}
            >
              Meeting Rooms
            </Link>
            <Link
              to="/about-us"
              className="hover:text-green-500"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className="hover:text-green-500"
              onClick={toggleMenu}
            >
              Contact Us
            </Link>
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="hover:text-green-500"
                onClick={toggleMenu}
              >
                Login
              </Link>
            ) : (
              <>
                {isAdmin ? (
                  <Link
                    to="/dashboard"
                    className="hover:text-green-500"
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/my-bookings"
                    className="hover:text-green-500"
                    onClick={toggleMenu}
                  >
                    My Bookings
                  </Link>
                )}
                <Link
                  to="/logout"
                  className="hover:text-green-500"
                  onClick={toggleMenu}
                >
                  Logout
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
