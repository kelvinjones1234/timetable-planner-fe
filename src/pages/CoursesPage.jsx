import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { FaPlus, FaBook } from "react-icons/fa";
import axios from "axios";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [newCourse, setNewCourse] = useState({
    title: "",
    code: "",
    units: "",
    num_students: "",
    department: "",
    level: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("https://explanner.pythonanywhere.com/api/departments/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the departments!", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://explanner.pythonanywhere.com/api/courses/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  const handleDepartmentChange = (value) => {
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      department: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://explanner.pythonanywhere.com/api/courses/", newCourse, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCourses((prevCourses) => [...prevCourses, response.data]);
        setNewCourse({
          title: "",
          code: "",
          units: "",
          num_students: "",
          department: "",
          level: "",
        });
        setIsFormVisible(false);
        // Show notification if needed
      })
      .catch((error) => {
        console.error("There was an error adding the course:", error);
      });
  };

  // Get current courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-100 pt-[5rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Registered Courses
            </h1>
            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600 transition duration-300"
            >
              <FaPlus className="mr-2" /> Add New Course
            </button>
          </div>

          {isFormVisible && (
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-lg p-6 mb-8"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Course Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newCourse.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Course Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    value={newCourse.code}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="units"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Course Units
                  </label>
                  <input
                    type="number"
                    id="units"
                    name="units"
                    value={newCourse.units}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="students"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Number of Students
                  </label>
                  <input
                    type="number"
                    id="students"
                    name="num_students"
                    value={newCourse.num_students}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Department
                  </label>

                  <select
                    name="selectedDepartment"
                    aria-label="Department"
                    value={newCourse.id} // Assuming departmentId is the correct field in newCourse
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="" // Set the default value to an empty string
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.department}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Level
                  </label>

                  <select
                    name="level"
                    aria-label="Level"
                    value={newCourse.level}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="" // Set the default value to an empty string
                  >
                    <option value="" disabled>
                      Select Level
                    </option>
                    <option value="HNDII">HNDII</option>
                    <option value="HNDI">HNDI</option>
                    <option value="NDII">NDII</option>
                    <option value="NDI">NDI</option>
                  </select>
                </div>
              </div>
              {console.log(newCourse)}

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Add Course
                </button>
              </div>
            </form>
          )}
          {/* {console.log(newCourse)} */}

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Units
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {console.log(courses)}
                  {currentCourses.map((course) => (
                    <tr key={course.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaBook className="text-gray-500 mr-2" />
                          <div className="text-sm font-medium text-gray-900">
                            {course.title}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {course.code}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {course.units}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {course.num_students}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {course.department_name}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

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
                  <span className="font-medium">{indexOfFirstCourse + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastCourse, courses.length)}
                  </span>{" "}
                  of <span className="font-medium">{courses.length}</span>{" "}
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
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;
