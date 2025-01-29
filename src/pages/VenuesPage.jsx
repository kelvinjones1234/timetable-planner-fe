import React, { useState, useEffect, useContext } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { FaPlus, FaBuilding, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const VenuesPage = () => {
  const [venues, setVenues] = useState([]);
  const [newVenue, setNewVenue] = useState({ name: "", capacity: "" });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const venuesPerPage = 5; // Number of venues per page

  const { api } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("https://explanner.pythonanywhere.com/api/venues/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setVenues(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the venues!", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVenue((prevVenue) => ({
      ...prevVenue,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://explanner.pythonanywhere.com/api/venues/", newVenue, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setVenues((prevVenues) => [...prevVenues, response.data]);
        setNewVenue({ name: "", capacity: "" });
        setIsFormVisible(false);
        showNotification("Venue added successfully!");
      })
      .catch((error) => {
        console.error("There was an error adding the venue:", error);
      });
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  // Pagination logic
  const indexOfLastVenue = currentPage * venuesPerPage;
  const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
  const currentVenues = venues.slice(indexOfFirstVenue, indexOfLastVenue);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(venues.length / venuesPerPage);
  
  const totalCapacity = venues.reduce((sum, venue) => sum + venue.capacity, 0);
  // console.log('Total Capacity:', totalCapacity);  // This will show 912

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-100 pt-[5rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Registered Venues</h1>
            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600 transition duration-300"
            >
              <FaPlus className="mr-2" /> Add New Venue
            </button>
          </div>

          {isFormVisible && (
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-lg p-6 mb-8"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Venue Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newVenue.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="capacity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Capacity
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={newVenue.capacity}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Add Venue
                </button>
              </div>
            </form>
          )}

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {isTableVisible && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Venue Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Capacity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentVenues.map((venue) => (
                      <tr key={venue.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaBuilding className="text-gray-500 mr-2" />
                            <div className="text-sm font-medium text-gray-900">
                              {venue.name.toUpperCase()}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {venue.capacity}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing{" "}
                        <span className="font-medium">
                          {indexOfFirstVenue + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">{indexOfLastVenue}</span>{" "}
                        of <span className="font-medium">{venues.length}</span>{" "}
                        results
                      </p>
                    </div>
                    <div>
                      <nav
                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination"
                      >
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span>Previous</span>
                        </button>
                        {Array.from(
                          { length: totalPages },
                          (_, index) => index + 1
                        ).map((pageNumber) => (
                          <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              pageNumber === currentPage
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-500"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        ))}
                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span>Next</span>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {notification && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg">
              {notification}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VenuesPage;
