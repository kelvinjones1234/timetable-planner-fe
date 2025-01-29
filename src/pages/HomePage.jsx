import { React, useContext } from "react";
import NavBar from "../components/NavBar";
import hero_img from "../assets/hero_image.jpg";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <NavBar />
      <section className="relative bg-blue-500 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={hero_img}
            alt="Background"
            className="object-cover h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-gray-200">
              Plan Your Exams Efficiently
            </h1>
            <p className="text-lg md:text-2xl mb-8 max-w-[900px] mx-auto">
              ExamPlanner helps you organize your exam schedules, allocate
              venues, and manage courses with ease. Simplify your planning and
              avoid clashes with our intuitive system.
            </p>
            <Link to={user ? "/plan" : "/login"}>
              <div className="inline-block bg-yellow-500 text-blue-800 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300">
                Get Started
              </div>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
