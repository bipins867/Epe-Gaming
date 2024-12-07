import { Navigate, Route, Routes, NavLink } from "react-router-dom";
import { Announcement } from "./Announcement/announcement";
import { Categories } from "./Categories/categories";
import "./Dashboard.css";
import { useState } from "react";
import { HomePage } from "./Home/Home";
import { AdminProfilePage } from "./AdminProfile/AdminProfile";
import { CustomerPage } from "./Customer/Customer";
import { ReferralPage } from "./Referral/Referral";
import { WithdrawalPage } from "./Withdrawal/Withdrawal";
import { WalletPage } from "./Wallet/Wallet";
import { UserActivityPage } from "./UserActivity/UserActivity";
import { AdminActivityPage } from "./AdminActivity/AdminActivity";

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
              to="./"
              className={({ isActive }) =>
                isActive ? "tab-link active-tab" : "tab-link"
              }
            >
              <i className="tab-icon bi bi-speedometer2"></i>
              {!collapsed && <span>Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="./announcement"
              className={({ isActive }) =>
                isActive ? "tab-link active-tab" : "tab-link"
              }
            >
              <i className="tab-icon bi bi-megaphone"></i>
              {!collapsed && <span>Announcement</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="./categories"
              className={({ isActive }) =>
                isActive ? "tab-link active-tab" : "tab-link"
              }
            >
              <i className="tab-icon bi bi-list"></i>
              {!collapsed && <span>Category & Games</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="./customers"
              className={({ isActive }) =>
                isActive ? "tab-link active-tab" : "tab-link"
              }
            >
              <i className="tab-icon bi bi-people"></i>
              {!collapsed && <span>Customers</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="./referral"
              className={({ isActive }) =>
                isActive ? "tab-link active-tab" : "tab-link"
              }
            >
              <i className="tab-icon bi bi-person-plus-fill"></i>
              {!collapsed && <span>Referral</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="./withdrawal"
              className={({ isActive }) =>
                isActive ? "tab-link active-tab" : "tab-link"
              }
            >
              <i className="tab-icon bi bi-cash-stack"></i>
              {!collapsed && <span>Withdrawal</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="./wallet"
              className={({ isActive }) =>
                isActive ? "tab-link active-tab" : "tab-link"
              }
            >
              <i className="tab-icon bi bi-wallet2"></i>
              {!collapsed && <span>Wallet</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="./userActivity"
              className={({ isActive }) =>
                isActive ? "tab-link active-tab" : "tab-link"
              }
            >
              <i className="tab-icon bi bi-person-lines-fill"></i>
              {!collapsed && <span>User Activity</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="./adminActivity"
              className={({ isActive }) =>
                isActive ? "tab-link active-tab" : "tab-link"
              }
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
          <Route path="" element={<HomePage />} />
          <Route path="adminProfile" element={<AdminProfilePage />} />
          <Route path="categories" element={<Categories />} />
          <Route path="announcement" element={<Announcement />} />
          <Route path="customers" element={<CustomerPage />} />
          <Route path="referral" element={<ReferralPage />} />
          <Route path="withdrawal" element={<WithdrawalPage />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="userActivity" element={<UserActivityPage />} />
          <Route path="adminActivity" element={<AdminActivityPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </div>
  );
};
