import { Navigate, Route, Routes } from "react-router-dom";
import "./home.css";
import { Header } from "../../Header/Header";
import { Footer } from "../../Footer/Footer";
import { Legality } from "./Legality/Legality";
import { AboutUs } from "./AboutUs/AboutUs";
import { HomeScreen } from "./HomeScreen/HomeScreen";
import { Dashboard } from "./Dashboard/Dashboard";

export const Home = () => {
  return (
    <div className="app-container">
      <Header />
      <div>
        <Routes>
          {/* Default route for homepage */}
          <Route path="/" element={<HomeScreen />} />

          {/* Other routes */}
          <Route path="legality/*" element={<Legality />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Catch-all for invalid routes, redirecting to homepage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
