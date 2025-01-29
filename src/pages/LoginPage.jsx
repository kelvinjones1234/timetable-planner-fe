import React, { useEffect, useContext, useState } from "react";
import NavBar from "../components/NavBar";
import PrimaryButton from "../components/PrimaryButton";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const { userError, loginUser, setUserError } = useContext(AuthContext);

  const validInputs = () => {
    const newError = {};
    if (!username) {
      newError.usernameError = "Please fill in your username";
    }
    if (!password) {
      newError.passwordError = "Please fill in your password";
    }
    setErrorMessage(newError);
    return Object.keys(newError).length === 0;
  };

  const login = (e) => {
    e.preventDefault(); 
    if (validInputs()) {
      setLoading(true); // Set loading to true when login starts
      loginUser(username, password).finally(() => {
        setLoading(false); // Set loading to false after login completes
      });
    }
  };

  useEffect(() => {
    if (userError) {
      setErrorMessage((prev) => ({
        ...prev,
        anonymousError: "Incorrect login details.",
      }));
    }
  }, [userError]);

  useEffect(() => {
    if (errorMessage.anonymousError) {
      setUserError("");
    }
  }, [errorMessage.anonymousError, setUserError]);

  return (
    <div>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 mx-5">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Login to Exam Planner
          </h1>
          {errorMessage.anonymousError && (
            <div className="text-red-500 text-center mb-4">
              {errorMessage.anonymousError}
            </div>
          )}
          <form onSubmit={login}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Staff Identification Number
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errorMessage.usernameError ? "border-red-500" : ""
                }`}
                required
              />
              {errorMessage.usernameError && (
                <p className="text-red-500 text-sm mt-1">
                  {errorMessage.usernameError}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errorMessage.passwordError ? "border-red-500" : ""
                }`}
                required
              />
              {errorMessage.passwordError && (
                <p className="text-red-500 text-sm mt-1">
                  {errorMessage.passwordError}
                </p>
              )}
            </div>
            <PrimaryButton
              label="Login"
              style="w-full"
              loading={loading}
              setLoading={setLoading}
            />
          </form>
          <p className="mt-4 text-center text-gray-600">
            Having issues logging in?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Contact Admin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
