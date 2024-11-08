import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { Announcement } from "./Announcement/announcement";
import { Categories } from "./Categories/categories";

export const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      {/* Render nested routes here */}
      <Routes>
        <Route path="categories" element={<Categories />} />
        <Route path="announcement" element={<Announcement />} />
        <Route path="categories" element={<Categories />} />
        <Route path="*" element={<Navigate to="announcement" replace />} />
      </Routes>
      <Outlet />
    </>
  );
};
