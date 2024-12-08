import React, { useState } from "react";
import "./AdminProfile.css";
import { ProfilePage } from "./Profile/Profile";
import { ActivityPage } from "./Activity/Activity";

export const AdminProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile"); // Manage active tab state

  return (
    <div className="app-container">
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Admin Profile
        </button>
        <button
          className={`tab-button ${activeTab === "admin" ? "active" : ""}`}
          onClick={() => setActiveTab("admin")}
        >
          Admin Activity
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Tab 1: Profile */}
        {activeTab === "profile" && <ProfilePage />}

        {/* Tab 2: Admin Activity */}
        {activeTab === "admin" && <ActivityPage />}
      </div>
    </div>
  );
};
