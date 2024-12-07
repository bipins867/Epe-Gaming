import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="admin-footer shadow-sm">
      <Container fluid>
        <Row className="py-3">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} <strong>PPL Gaming</strong>. All
              rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <ul className="footer-links">
              <li>
                <Link to="/legality/privacyPolicy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/legality/termsAndConditions" className="footer-link">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
