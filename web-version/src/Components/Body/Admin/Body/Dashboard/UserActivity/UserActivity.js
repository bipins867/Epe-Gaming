import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./UserActivity.css";
import { ActivityPage } from "./Activity/Activity";
import { SearchPage } from "./Search/Search";
import {ViewPage} from './View/View';

export const UserActivityPage = () => {
  const [activeTab, setActiveTab] = useState("search");

  

  return (
    <div className="user-activity-container">
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "search" ? "active" : ""}`}
          onClick={() => setActiveTab("search")}
        >
          Search User
        </button>
        <button
          className={`tab-button ${activeTab === "recent" ? "active" : ""}`}
          onClick={() => setActiveTab("recent")}
        >
          Recent Activity
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Tab: Search User */}
        {activeTab === "search" && 
        
        <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="view/:customerId" element={<ViewPage />} />
            <Route
              path="*"
              element={<Navigate to="/admin/userActivity/" replace />}
            />
          </Routes>

        }

        {/* Tab: Recent Activity */}
        {activeTab === "recent" && <ActivityPage />}
      </div>
    </div>
  );
};
