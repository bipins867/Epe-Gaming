import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Navbar.css"; // Importing CSS for styling

export const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Pro Player League</div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/legality">Legality</Link>
        </li>
        <li>
          <Link to="/aboutUs">About Us</Link>
        </li>
      </ul>

      {/* <div className="navbar-actions">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div> */}
    </nav>
  );
};

// export default Navbar;
