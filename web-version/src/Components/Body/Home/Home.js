import { Navigate, Route, Routes } from "react-router-dom";

import "./home.css";
import { Header } from "../../Header/Header";
import { Footer } from "../../Footer/Footer";
import { Legality } from "./Legality/Legality";
import { Dashboard } from "../Admin/Dashboard/Dashboard";

export const Home = () => {
  return (
    <>
      <div className="app-container">
        <Header />
        <div>
          <div>
            <Routes>
              <Route path="legality/*" element={<Legality />} />

              <Route path="dashboard/*" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="dashboard/" replace />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
