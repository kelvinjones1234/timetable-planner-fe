import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FileText,
  Loader2,
  AlertTriangle,
  Calendar,
  Library,
  MapPin,
  Search,
  Download,
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const API_URL = "https://explanner.pythonanywhere.com/api/exam-time-table/";

const TimeTablePage = () => {
  const [timeTableDetails, setTimeTableDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTimeTable = async () => {
      try {
        const response = await axios.get(API_URL);
        setTimeTableDetails(response.data);
      } catch (err) {
        setError("Failed to fetch time table data. Please try again later.");
        console.error("Error fetching time table:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeTable();
  }, []);

  const filteredTimetables = timeTableDetails.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course_set_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.venue_set_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <div className="space-y-2">
            <p className="text-xl font-semibold text-gray-800">
              Loading Exam Schedules
            </p>
            <p className="text-sm text-gray-500">
              Please wait while we fetch your timetables...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Error Loading Timetables
              </h3>
              <p className="text-gray-600">{error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-blue-800 to-indigo-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px]" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Final Exam Schedules
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Access and download exam timetables. Stay
              organized!
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by title, course set, or venue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
              />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTimetables.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-md font-bold text-gray-900 truncate">
                      {item.title.toUpperCase()}
                    </h2>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="space-y-4 text-[.7rem]">
                    <InfoRow
                      icon={<Library className="h-5 w-5 text-blue-600" />}
                      label="Course Set"
                      value={item.course_set_name.toUpperCase()}
                    />
                    <InfoRow
                      icon={<MapPin className="h-5 w-5 text-blue-600" />}
                      label="Venue Set"
                      value={item.venue_set_name.toUpperCase()}
                    />
                    <InfoRow
                      icon={<Calendar className="h-5 w-5 text-blue-600" />}
                      label="Date Created"
                      value={`${new Date(item.date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )} ${new Date(item.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                    />
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <Link
                    to={item.excel_file}
                    download
                    className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 group-hover:shadow-md"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    <span className="font-semibold">Download PDF</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredTimetables.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                No results found
              </h3>
              <p className="text-gray-600 mt-2">
                Try adjusting your search terms
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
    <div>
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  </div>
);

export default TimeTablePage;
