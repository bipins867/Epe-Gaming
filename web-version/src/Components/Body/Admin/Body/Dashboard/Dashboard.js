import { Navigate, Route, Routes, NavLink } from "react-router-dom";
import { Announcement } from "./Announcement/announcement";
import { Categories } from "./Categories/categories";
import './Dashboard.css';
import { useState } from "react";
import { HomePage } from "./Home/Home";

export const DashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="admin-page">
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <ul className="tabs-list">
          <li>
            <NavLink 
              to="/admin" 
              className={({ isActive }) => isActive ? "tab-link active-tab" : "tab-link"}
            >
              <i className="tab-icon bi bi-speedometer2"></i>
              {!collapsed && <span>Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/announcement" 
              className={({ isActive }) => isActive ? "tab-link active-tab" : "tab-link"}
            >
              <i className="tab-icon bi bi-megaphone"></i>
              {!collapsed && <span>Announcement</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/categories" 
              className={({ isActive }) => isActive ? "tab-link active-tab" : "tab-link"}
            >
              <i className="tab-icon bi bi-list"></i>
              {!collapsed && <span>Category</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/customers" 
              className={({ isActive }) => isActive ? "tab-link active-tab" : "tab-link"}
            >
              <i className="tab-icon bi bi-people"></i>
              {!collapsed && <span>Customers</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/user-activity" 
              className={({ isActive }) => isActive ? "tab-link active-tab" : "tab-link"}
            >
              <i className="tab-icon bi bi-person-lines-fill"></i>
              {!collapsed && <span>User Activity</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin-activity" 
              className={({ isActive }) => isActive ? "tab-link active-tab" : "tab-link"}
            >
              <i className="tab-icon bi bi-gear"></i>
              {!collapsed && <span>Admin Activity</span>}
            </NavLink>
          </li>
        </ul>
        <button className="toggle-button" onClick={toggleSidebar}>
          {collapsed ? "❯" : "❮"}
        </button>
      </div>
      <div className="content">
        <Routes>
          <Route path="" element={<HomePage/>}/>
          <Route path="categories" element={<Categories />} />
          <Route path="announcement" element={<Announcement />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </div>
  );
};
