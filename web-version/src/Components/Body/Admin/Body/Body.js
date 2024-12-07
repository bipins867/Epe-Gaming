import { Navigate, Route, Routes } from "react-router-dom";
import {  DashboardPage } from "./Dashboard/Dashboard";
import { AdminLoginPage } from "./Login/Login";



export const Body = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />
        <Route path="/*" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};
