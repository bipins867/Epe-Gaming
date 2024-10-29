import React from "react";
import "./Navbar.css"; // Importing CSS for styling

export const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Quantum Arena</div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#tournaments">Tournaments</a></li>
        <li><a href="#leaderboard">Leaderboard</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#highlights">Highlights</a></li>
        <li><a href="#videos">Videos</a></li>
      </ul>
      <div className="navbar-actions">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
};



// export default Navbar;
