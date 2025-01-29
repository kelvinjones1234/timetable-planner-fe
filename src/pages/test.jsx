import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PlanPage = () => {
  const [courseSets, setCourseSets] = useState([]);
  const [timeTableTitle, setTimeTableTitle] = useState("");
  const [venueSets, setVenueSets] = useState([]);
  const [selectedCourseSet, setSelectedCourseSet] = useState({});
  const [selectedVenueSet, setSelectedVenueSet] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [constraints, setConstraints] = useState("");

  useEffect(() => {
    // Fetch course sets
    axios.get("http://127.0.0.1:8000/api/course-sets/").then((response) => {
      setCourseSets(response.data);
    });

    // Fetch venue sets
    axios.get("http://127.0.0.1:8000/api/venue-sets/").then((response) => {
      setVenueSets(response.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission logic
    const planData = {
      courseSet: selectedCourseSet,
      venueSet: selectedVenueSet,
      startDate,
      endDate,
      constraints,
    };

    console.log("Plan data:", planData);

    const courses = planData.courseSet.courses;
    const venues = planData.venueSet.venues;

    courses.forEach((course) => {
      console.log(
        `Course Code: ${course.code}, Number of Students: ${course.num_students}`
      );
    });

    const courseDetails = courses.map((course) => ({
      code: course.code,
      num_students: course.num_students,
    }));

    venues.forEach((venue) => {
      console.log(`Venue Name: ${venue.name}, Capacity: ${venue.capacity}`);
    });

    const venueDetails = venues.map((venue) => ({
      name: venue.name,
      capacity: venue.capacity,
    }));

    // Convert the list to a JSON string
    const venueDetailsString = JSON.stringify(venueDetails);
    const courseDetailsString = JSON.stringify(courseDetails);

    console.log("Venue Details as String:", venueDetailsString);
    console.log("Course Details as String:", courseDetailsString);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/process-venue-details/",
        {
          title: timeTableTitle,
          venueDetails: venueDetailsString, // Pass venueDetails array
          courseDetails: courseDetailsString, // Pass courseDetails array
          startDate: startDate, // Pass startDate value
          endDate: endDate, // Pass endDate value
          constraints: constraints, // Pass constraints value
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Processed data:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log("time table title: ", timeTableTitle);

  // console.log("selected course set: ", selectedCourseSet);
  // console.log("selected venue set: ", selectedVenueSet);
  // console.log("start date: ", startDate);
  // console.log("end date: ", endDate);
  // console.log("constraints: ", constraints);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-100 pt-[5rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Create Examination Time Table
          </h1>
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

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Create Plan
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlanPage;



<div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Final Examination Schedule - 2024
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Course Set:
              </h3>
              <p className="text-xl text-gray-900"></p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Venue Set:
              </h3>
              <p className="text-xl text-gray-900"></p>
            </div>
            <div className="md:col-span-2 text-center mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Download Timetable
              </h3>
              <Link
                // to={pdfLink}
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105 duration-300"
                download
              >
                <FaFilePdf className="mr-2" />
                Download PDF
              </Link>
            </div>
          </div>
        </div>