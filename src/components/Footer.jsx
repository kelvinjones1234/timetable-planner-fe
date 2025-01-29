import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/3 mb-4 max-w-[400px] ">
            <h2 className="text-xl font-bold mb-2 text-yellow-400">
              Exam Planner
            </h2>
            <p className="text-sm">
              Your ultimate tool for planning and organizing exams. Manage your
              schedules, venues, and courses efficiently with our intuitive
              platform.
            </p>
          </div>
          <div className="w-full sm:w-1/6 mb-4">
            <h3 className="text-lg font-semibold mb-2 text-yellow-400">
              Quick Links
            </h3>
            <ul>
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/timetable" className="hover:underline">
                  Timetable
                </a>
              </li>
              <li>
                <a href="/venues" className="hover:underline">
                  Venues
                </a>
              </li>
              <li>
                <a href="/courses" className="hover:underline">
                  Courses
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/3 mb-4">
            <h3 className="text-lg font-semibold mb-2 text-yellow-400">
              Contact Us
            </h3>
            <ul>
              <li>ExamPlanner@gmail.com</li>
              <li>Tel: 0814-1772-672</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-700 mt-8 pt-4 text-center text-sm">
          <p>&copy; 2024 PraiseMedia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
