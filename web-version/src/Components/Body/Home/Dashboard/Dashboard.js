import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./Home/Home";
import { GamesPage } from "./Games/Games";

export const DashboardPage = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path=":gameTitle/*" element={<GamesPage />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
};
