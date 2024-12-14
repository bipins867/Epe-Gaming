import React from "react";
import { Navbar, Container, Dropdown, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { PersonCircle } from "react-bootstrap-icons";
import "./Header.css";
import { useDispatch } from "react-redux";
import { adminLogOut, setAdminAuthToken } from "../../../../Store/Admin/auth";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("adminToken");

    dispatch(adminLogOut());
    dispatch(setAdminAuthToken(""));
    navigate("/admin");
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container fluid>
        {/* Brand/Logo */}
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          <div className="navbar-logo">
            {/* Logo Image */}
            <Image
              src="/Assets/Logo/Brand/ppl-logo-half.png" // Ensure this path is correct
              alt="PPL Logo"
              width={50} // Adjust the width as needed
              height={50} // Adjust the height to maintain aspect ratio
              className="me-2" // Add margin-right class for spacing if needed
            />
            {/* Text for Logo */}
            PRO PLAY LEAGUE
          </div>
        </Navbar.Brand>

        {/* Toggle for Mobile View */}
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          {/* Profile Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="profile-dropdown">
              <PersonCircle size={20} className="me-2" />
              Admin
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/admin/adminProfile">
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as="button" onClick={handleLogout}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
