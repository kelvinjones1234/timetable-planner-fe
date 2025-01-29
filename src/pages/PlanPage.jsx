import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import DatePicker from "react-datepicker";
import PrimaryButton from "../components/PrimaryButton";
import "react-datepicker/dist/react-datepicker.css";

const PlanPage = () => {
  const [courseSets, setCourseSets] = useState([]);
  const [timeTableTitle, setTimeTableTitle] = useState("");
  const [venueSets, setVenueSets] = useState([]);
  const [selectedCourseSet, setSelectedCourseSet] = useState({});
  const [selectedVenueSet, setSelectedVenueSet] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [constraints, setConstraints] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseSetsResponse, venueSetsResponse] = await Promise.all([
          axios.get("https://explanner.pythonanywhere.com/api/course-sets/"),
          axios.get("https://explanner.pythonanywhere.com/api/venue-sets/"),
        ]);
        setCourseSets(courseSetsResponse.data);
        setVenueSets(venueSetsResponse.data);
      } catch (error) {
        setError(
          "Certain resources are not available at the moment. Please try again."
        );
      }
    };

    fetchData();
  }, []);

  const validateInputs = () => {
    if (!timeTableTitle.trim()) {
      setError("Please enter a time table title.");
      return false;
    }
    if (!selectedCourseSet.name) {
      setError("Please select a course set.");
      return false;
    }
    if (!selectedVenueSet.name) {
      setError("Please select a venue set.");
      return false;
    }
    if (!startDate) {
      setError("Please select a start date.");
      return false;
    }
    if (!endDate) {
      setError("Please select an end date.");
      return false;
    }
    if (startDate > endDate) {
      setError("End date must be after start date.");
      return false;
    }
    return true;
  };

  console.log("Selected Course Set", selectedCourseSet);
  console.log("Selected Venue Set", selectedVenueSet);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotification("");
    if (!validateInputs()) return;

    setLoading(true);
    const planData = {
      title: timeTableTitle,
      venueDetails: JSON.stringify(
        selectedVenueSet.venues.map((venue) => ({
          name: venue.name,
          capacity: venue.capacity,
        }))
      ),
      courseDetails: JSON.stringify(
        selectedCourseSet.courses.map((course) => ({
          code: course.code,
          num_students: course.num_students,
          units: course.units,
          department_name: course.department_name,
          level: course.level,
        }))
      ),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      constraints: constraints,
      course_set_name: selectedCourseSet.name,
      venue_set_name: selectedVenueSet.name,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/process-time-table/",
        planData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.data_dict) {
        setNotification("The time table has been generated successfully!");
      } else {
        setError(
          "Certain resources are out of reach at the time. Please try again."
        );
      }
    } catch (error) {
      setError(
        "Certain resources are out of reach at the time. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = () => {
    if (error) {
      return (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      );
    }
    if (notification) {
      return (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {notification}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-100 pt-[5rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Create Examination Time Table
          </h1>
          {renderMessage()}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="md:col-span-2 lg:col-span-3">
                <label
                  htmlFor="timeTableTitle"
                  className="block text-sm font-medium text-gray-700 py-1"
                >
                  Time Table Title
                </label>
                <input
                  type="text"
                  id="timeTableTitle"
                  name="timeTableTitle"
                  value={timeTableTitle}
                  onChange={(e) => setTimeTableTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter time table title or name"
                  required
                />
              </div>
              <div>
                <div>
                  <label
                    htmlFor="courseSet"
                    className="block text-sm font-medium text-gray-700 py-1"
                  >
                    Select Course Set
                  </label>
                  <select
                    id="courseSet"
                    name="courseSet"
                    onChange={(e) => {
                      const selectedSet = courseSets.find(
                        (set) => set.name === e.target.value
                      );
                      setSelectedCourseSet(selectedSet || {});
                    }}
                    className="custom-select w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">-- Select a Course Set --</option>
                    {courseSets.map((set) => (
                      <option key={set.name} value={set.name}>
                        {set.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="venueSet"
                    className="block text-sm font-medium text-gray-700 py-1"
                  >
                    Select Venue Set
                  </label>
                  <select
                    id="venueSet"
                    name="venueSet"
                    onChange={(e) => {
                      const selectedSet = venueSets.find(
                        (set) => set.name === e.target.value
                      );
                      setSelectedVenueSet(selectedSet || {});
                    }}
                    className="custom-select w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">-- Select a Venue Set --</option>
                    {venueSets.map((set) => (
                      <option key={set.name} value={set.name}>
                        {set.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700 py-1"
                  >
                    Exam Start Date
                  </label>
                  <DatePicker
                    id="startDate"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700 py-1"
                  >
                    Exam End Date
                  </label>
                  <DatePicker
                    id="endDate"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label
                  htmlFor="constraints"
                  className="block text-sm font-medium text-gray-700"
                >
                  Constraints
                </label>
                <textarea
                  id="constraints"
                  name="constraints"
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter any constraints for the plan..."
                ></textarea>
              </div>
            </div>

            <div className="mt-6 pointer-events-none">
              <PrimaryButton
                label="the submit button has been disabled to prevent API abuse"
                style="w-full"
                loading={loading}
                setLoading={setLoading}
              />
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlanPage;
