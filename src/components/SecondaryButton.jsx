import React from "react";
import { Link } from "react-router-dom";

const SecondaryButton = ({ label, to, style }) => {
  return (
    <div className="login-button">
      <Link to={to}>
        <button
          className={`py-2 px-6 font-bold rounded-[.5rem] bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white transition-colors duration-400 hover:from-purple-600 hover:via-purple-700 hover:to-purple-800`}
        >
          {label}
        </button>
      </Link>
    </div>
  );
};

export default SecondaryButton;
