import React from "react";
import { Container, Row, Col, Card,  Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css"; // Custom CSS for styling

export const HomePage = () => {
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

  return (
    <Container className="admin-categories-page mt-4">
      {/* Image Slider Section */}
      <Row className="mb-4">
        <Col>
          <Carousel className="categories-slider">
            {games.map((game, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 slider-image"
                  src={game.image}
                  alt={game.title}
                />
                <Carousel.Caption>
                  <h3 className="slider-title">{game.title}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
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
