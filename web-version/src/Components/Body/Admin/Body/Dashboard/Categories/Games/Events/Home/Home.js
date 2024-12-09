import React, { useState } from "react";
import { Tab, Nav, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.css"; // Custom CSS for styling
import { HostedPage } from "../Hosted/Hosted";
import { ChallengePage } from "../Challenge/Challenge";
import { SponsoredPage } from "../Sponsored/Sponsored";

export const HomePage = () => {
  const [activeKey, setActiveKey] = useState("hosted");
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="events-page">
      <Row className="mb-3">
        {/* Back Button */}
        <Col>
          <Button
            variant="outline-secondary"
            className="back-button"
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            <i className="fa-solid fa-arrow-left me-2"></i> Back
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <h1 className="events-title text-center mb-4">Events</h1>
        </Col>
      </Row>

      <Tab.Container
        activeKey={activeKey}
        onSelect={(key) => setActiveKey(key)}
      >
        {/* Navigation Tabs */}
        <Nav variant="tabs" className="justify-content-center mb-4 events-tabs">
          <Nav.Item>
            <Nav.Link eventKey="hosted" className="events-tab-link">
              Hosted
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="challenge" className="events-tab-link">
              Challenge
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="sponsored" className="events-tab-link">
              Sponsored
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Tab Content */}
        <Tab.Content>
          <Tab.Pane eventKey="hosted" className="events-tab-pane">
            <HostedPage />
          </Tab.Pane>

          <Tab.Pane eventKey="challenge" className="events-tab-pane">
            <ChallengePage />
          </Tab.Pane>

          <Tab.Pane eventKey="sponsored" className="events-tab-pane">
            <SponsoredPage />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};
