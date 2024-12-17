import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import "./Home.css"; // Custom CSS for styling
import { Link } from "react-router-dom";
import { ImageSliderPreview } from "../../Utils/Utils";
import { fetchImagesHandler } from "../../apiImageHandler";
import { useAlert } from "../../../../../../../UI/Alert/AlertContext";

export const HomePage = () => {
  const [images, setImages] = useState([]);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchImages = async () => {
      setIsImageLoading(true); // Start loading spinner
      const response = await fetchImagesHandler(
        "bgmi",
        true,
        null,
        setIsImageLoading,
        showAlert
      );

      if (response) {
        setImages(response.data);
      }
      setIsImageLoading(false); // Stop loading spinner
    };
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {isImageLoading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <ImageSliderPreview images={images} />
          )}
        </Col>
      </Row>

      {/* Update Images Link */}
      <Row className="mb-5 text-center">
        <Col>
          <Link
            to="./imageSlider"
            className="btn btn-primary update-images-link"
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
