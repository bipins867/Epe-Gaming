import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { Store } from "./Store";
import { AlertProvider } from "./Components/UI/Alert/AlertContext";
import { setAdminAuthToken, adminLogin } from "./Store/Admin/auth";

const root = ReactDOM.createRoot(document.getElementById("root"));

const RootComponent = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      const adminToken = localStorage.getItem("adminToken");

      if (adminToken) {
        // Dispatch to Redux store to set authentication state
        Store.dispatch(adminLogin()); // Update Redux state (isLoggedIn = true)
        Store.dispatch(setAdminAuthToken(adminToken)); // Update Redux token
      }

      // Add a 2-second delay to ensure the spinner shows for a minimum time
      setTimeout(() => {
        setIsInitializing(false); // Initialization complete
      }, 500);
    };

    initializeApp();
  }, []);

  if (isInitializing) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f0f2f5",
        }}
      >
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <Provider store={Store}>
        <AlertProvider>
          <App />
        </AlertProvider>
      </Provider>
    </React.StrictMode>
  );
};

root.render(<RootComponent />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
