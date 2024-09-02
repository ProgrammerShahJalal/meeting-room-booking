import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/features/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accessing the user and authentication status from Redux store
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isAdmin = user?.role === "admin";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to logout
    navigate("/login"); // Redirect to the login page after logout
  };

  return (
    <nav className="bg-gray-100 text-black p-4 flex justify-between items-center">
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
            Login/Register
          </Link>
        ) : (
          <>
            {isAdmin ? (
              <Link
                to="/admin"
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
            <button
              onClick={handleLogout}
              className="hover:text-green-500 active:text-purple-500 font-medium"
            >
              Logout
            </button>
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
                Login/Register
              </Link>
            ) : (
              <>
                {isAdmin ? (
                  <Link
                    to="/admin"
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
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="hover:text-green-500"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
