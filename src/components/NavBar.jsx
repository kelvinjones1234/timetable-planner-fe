import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gradient">
              <a href="/home-page">ExamPlanner</a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to={user ? "/plan" : "/login"}>
                  <div className="text-gray-600 hover:text-sky-800 px-3 py-2 rounded-md text-sm font-medium">
                    Plan Time Table
                  </div>
                </Link>
                <Link to={"/venues"}>
                  <div className="text-gray-600 hover:text-sky-800 px-3 py-2 rounded-md text-sm font-medium">
                    Venues
                  </div>
                </Link>
                <Link to={"/courses"}>
                  <div className="text-gray-600 hover:text-sky-800 px-3 py-2 rounded-md text-sm font-medium">
                    Courses
                  </div>
                </Link>
                <Link to={"/time-table"}>
                  <div className="text-gray-600 hover:text-sky-800 px-3 py-2 rounded-md text-sm font-medium">
                    Time Table
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="login-button">
              <Link to={"/login"}>
                <button
                  onClick={user && logoutUser}
                  className="py-2 px-6 font-bold rounded-[.5rem] bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white transition-colors duration-400 hover:from-purple-600 hover:via-purple-700 hover:to-purple-800"
                >
                  {!user ? "Login" : "Logout"}
                </button>
              </Link>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-sky-800 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 focus:text-gray-800"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-white shadow-lg z-40"
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-600 hover:text-sky-800 block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/time-table"
              className="text-gray-600 hover:text-sky-800 block px-3 py-2 rounded-md text-base font-medium"
            >
              Time Table
            </Link>
            <Link
              to="/venues"
              className="text-gray-600 hover:text-sky-800 block px-3 py-2 rounded-md text-base font-medium"
            >
              Venues
            </Link>
            <Link
              to="/courses"
              className="text-gray-600 hover:text-sky-800 block px-3 py-2 rounded-md text-base font-medium"
            >
              Courses
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
