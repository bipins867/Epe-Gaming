import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css"; // Custom CSS for styling
import { ImageSliderPreview } from "../Utils/Utils";
import { fetchImagesHandler } from "../apiImageHandler";
import { useAlert } from "../../../../../../UI/Alert/AlertContext";

export const HomePage = () => {
  const [images, setImages] = useState([]);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { showAlert } = useAlert();
  const games = [
    {
      title: "BGMI",
      image: "/Assets/Dashboard/Category/BattleRoyal/BGMI/bgmi.jpg",
      path: "./type/bgmi",
    },
    {
      title: "Free Fire",
      image: "/Assets/Dashboard/Category/BattleRoyal/FreeFire/freefire.jpg",
      path: "./type/freeFire",
    },
    {
      title: "Call of Duty: Mobile",
      image: "/Assets/Dashboard/Category/BattleRoyal/COD/cod.jpg",
      path: "./type/callOfDutyMobile",
    },
  ];

  useEffect(() => {
    const fetchImages = async () => {
      setIsImageLoading(true); // Start loading spinner
      const response = await fetchImagesHandler(
        "*",
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

  return (
    <Container className="admin-categories-page mt-4">
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

      {/* Games List Section */}
      <Row className="games-list">
        {games.map((game, index) => (
          <Col md={4} sm={6} key={index} className="mb-4">
            <Card className="game-card">
              <Card.Img
                variant="top"
                src={game.image}
                alt={game.title}
                className="game-card-image"
              />
              <Card.Body>
                <Card.Title className="game-card-title">
                  {game.title}
                </Card.Title>

                <Link
                  to={game.path}
                  className="btn btn-primary game-view-more-btn"
                >
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
