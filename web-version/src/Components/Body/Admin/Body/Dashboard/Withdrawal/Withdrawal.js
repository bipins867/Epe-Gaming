import React, { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./Withdrawal.css";
import { SearchPage } from "./Search/Search";
import { ViewPage } from "./View/View";
import { LockedPage } from "./Locked/Locked";

export const WithdrawalPage = () => {
  const [activeTab, setActiveTab] = useState("page1"); // Manage active tab state
  const navigate = useNavigate();
  return (
    <div className="app-container">
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "page1" ? "active" : ""}`}
          onClick={() => {
            navigate("/admin/withdrawal/"); // Navigate to page1
            setActiveTab("page1");
          }}
        >
          Pending Withdrawal Requests
        </button>
        <button
          className={`tab-button ${activeTab === "page2" ? "active" : ""}`}
          onClick={() => {
            navigate("/admin/withdrawal/");
            setActiveTab("page2");
          }}
        >
          Locked Withdrawal Requests
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "page1" && (
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="view/:customerId" element={<ViewPage />} />
            <Route
              path="*"
              element={<Navigate to="/admin/withdrawal/" replace />}
            />
          </Routes>
        )}
        {activeTab === "page2" && (
          <Routes>
            <Route path="/" element={<LockedPage />} />
            <Route path="view/:customerId" element={<ViewPage />} />
            <Route
              path="*"
              element={<Navigate to="/admin/withdrawal/" replace />}
            />
          </Routes>
        )}
      </div>
    </div>
  );
};
