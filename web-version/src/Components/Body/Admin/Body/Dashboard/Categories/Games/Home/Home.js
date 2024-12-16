import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Home.css"; // Custom CSS for styling
import { Link } from "react-router-dom";
import { ImageSliderPreview } from "../../Utils/Utils";

export const HomePage = () => {
  const [sliderImages, setSliderImages] = useState([
    {
      image: "/Assets/Dashboard/Category/BattleRoyal/BGMI/bgmi.jpg",
      title: "something else",
    },
    {
      image: "/Assets/Dashboard/Category/BattleRoyal/BGMI/bgmi.jpg",
      title: "something else",
    },
    {
      image: "/Assets/Dashboard/Category/BattleRoyal/BGMI/bgmi.jpg",
      title: "something else",
    },
  ]);

  useEffect(() => {
    if (false) {
      setSliderImages(null);
    }
  }, []);
  const dashboardData = [
    {
      title: "Ongoing Matches",
      count: 12,
      icon: "fa-solid fa-gamepad",
      bgClass: "ongoing-bg",
    },
    {
      title: "Past Matches",
      count: 45,
      icon: "fa-solid fa-history",
      bgClass: "past-bg",
    },
    {
      title: "Upcoming Matches",
      count: 8,
      icon: "fa-solid fa-clock",
      bgClass: "upcoming-bg",
    },
  ];

  return (
    <Container className="games-home-page mt-4">
      {/* Image Slider Section */}
      <Row className="mb-4">
        <Col>
          <ImageSliderPreview images={sliderImages} />
          <Link
            className="view-more-btn btn btn-primary update-image-btn mt-3"
            to="./imageSlider"
          >
            Update Images
          </Link>
        </Col>
      </Row>

      {/* Dashboard Section */}
      <Row className="dashboard-section mb-4">
        {dashboardData.map((item, index) => (
          <Col key={index} md={4} sm={6} className="mb-4">
            <Card className={`dashboard-card ${item.bgClass} text-white`}>
              <Card.Body className="d-flex align-items-center">
                <i className={`${item.icon} dashboard-icon`}></i>
                <div className="dashboard-content ms-3">
                  <h4 className="dashboard-count">{item.count}</h4>
                  <p className="dashboard-title">{item.title}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* View More Events Link */}
      <Row className="justify-content-center">
        <Col md="auto">
          <Link className="view-more-btn btn btn-primary" to="./events">
            View More Events
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
