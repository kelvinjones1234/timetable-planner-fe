import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./utils/PrivateRoute";
import PlanPage from "./pages/PlanPage";
import AuthProvider from "./context/AuthContext";
import VenuesPage from "./pages/VenuesPage";
import CoursesPage from "./pages/CoursesPage";
import TimeTablePage from "./pages/TimeTablePage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/plan" element={<PlanPage />} />
              <Route path="/venues" element={<VenuesPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/time-table" element={<TimeTablePage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
