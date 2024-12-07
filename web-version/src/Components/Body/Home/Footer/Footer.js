import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 
import "./Footer.css"; // Importing CSS for styling

export const Footer = () => {
    return (
      <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About PRO PLAY LEAGUE</h3>
          <p>Welcome to PRO PLAY LEAGUE, your destination for gaming tournaments and competitions. Join, compete, and show off your skills!</p>
        </div>
        
        {/* <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#tournaments">Tournaments</a></li>
            <li><a href="#leaderboard">Leaderboard</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div> */}

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: support@pplgaming.com</p>
       
          <div className="socials">
            <a href="#facebook" className="social-icon">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#twitter" className="social-icon">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#instagram" className="social-icon">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#youtube" className="social-icon">
              <i className="bi bi-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 PRO PLAY LEAGUE. All rights reserved.</p>
      </div>
    </footer>
  );
  };
  
 


