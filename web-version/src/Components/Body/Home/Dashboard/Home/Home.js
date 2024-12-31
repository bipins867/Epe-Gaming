import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // Import the slick carousel
import "./Home.css"; // Custom CSS for additional styling
import "slick-carousel/slick/slick.css"; // Slick carousel styles
import "slick-carousel/slick/slick-theme.css";

export const HomePage = () => {
  const dashboardBackgroundStyle = {
    backgroundImage:
      'url("/Assets/Dashboard/Category/BattleRoyal/battleRoyal.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    padding: "2rem",
  };

  // Slider images
  const sliderImages = [
    "/Assets/image/ENGL1.jpg",
    "/Assets/image/ENGL2.jpg",
    "/Assets/image/ENGL3.jpg",
  ]; // Replace with actual paths to your images

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  // Sample game data
  const games = [
    {
      title: "BGMI",
      description:
        "Battle Ground Mobile India (BGMI) is a free-to-play battle royale game where you fight for survival in a large open world.",
      image: "/Assets/Dashboard/Category/BattleRoyal/BGMI/bgmi.jpg",
      path: "/categories/bgmi",
    },
    {
      title: "Free Fire",
      description:
        "Free Fire is a fast-paced battle royale game where players fight in a shrinking map to become the last survivor.",
      image: "/Assets/Dashboard/Category/BattleRoyal/FreeFire/freefire.jpg",
      path: "#",
    },
    {
      title: "Call of Duty: Mobile",
      description:
        "Call of Duty: Mobile brings the classic franchise experience to mobile devices with exciting battle royale and multiplayer modes.",
      image: "/Assets/Dashboard/Category/BattleRoyal/COD/cod.jpg",
      path: "#",
    },
  ];

  return (
    <Container className="dashboard-page" style={dashboardBackgroundStyle}>
      {/* Category Section */}
      <Row className="mb-2">
        <Col>
          <div className="category-header text-center">
            <h1 className="category-title">Battle Royale</h1>
            <p className="category-description">
              Explore the best battle royale games! Get ready to compete and be
              the last one standing.
            </p>
          </div>
        </Col>
      </Row>

      {/* Image Slider Section */}
      <Row className="mb-2">
        <Col>
          <Row className="mb-5">
            <Col>
              <Slider {...sliderSettings}>
                {sliderImages.map((image, index) => (
                  <div key={index} className="slider-image-wrapper">
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="slider-image"
                    />
                  </div>
                ))}
              </Slider>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Games List Section */}
      <Row className="justify-content-center">
        {games.map((game, index) => (
          <Col md={4} sm={6} className="mb-4" key={index}>
            <Card className="game-card">
              <Image src={game.image} alt={game.title} className="game-image" />
              <Card.Body>
                <Card.Title>{game.title}</Card.Title>
                <Card.Text>{game.description}</Card.Text>
                <Link to={game.path} className="btn btn-primary">
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
