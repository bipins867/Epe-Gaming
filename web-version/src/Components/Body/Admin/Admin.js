import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLogin } from "./AdminLogin/Login";
import { Dashboard } from "./Dashboard/Dashboard";

export const Admin = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="dashboard/*" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};
