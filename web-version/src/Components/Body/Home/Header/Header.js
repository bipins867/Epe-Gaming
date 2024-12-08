import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Image } from "react-bootstrap"; // Import Image for displaying the logo
import "./Navbar.css"; // Importing CSS for styling

export const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Logo Image */}
        <Image
          src="/Assets/Logo/Brand/ppl-logo-half.png"  // Ensure this path is correct
          alt="PPL Logo"
          width={50}  // Adjust the width as needed
          height={50} // Adjust the height to maintain aspect ratio
          className="me-2"  // Add margin-right class for spacing if needed
        />
        {/* Text for Logo */}
        PRO PLAY LEAGUE
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <Link to="/legality">Legality</Link>
        </li>
        <li>
          <Link to="/aboutUs">About Us</Link>
        </li>
      </ul>

      {/* Uncomment and use the navbar-actions if needed */}
      {/* <div className="navbar-actions">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div> */}
    </nav>
  );
};
