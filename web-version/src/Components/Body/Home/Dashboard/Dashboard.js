import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import "./Dashboard.css"; // Custom CSS for additional styling

export const Dashboard = () => {
  // Dynamically set the background image
  const dashboardBackgroundStyle = {
    backgroundImage: 'url("/Assets/Dashboard/Category/BattleRoyal/battleRoyal.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    padding: "2rem",
  };

  return (
    <Container className="dashboard-page" style={dashboardBackgroundStyle}>
      {/* Category Section */}
      <Row className="mb-5">
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

      {/* Games List Section */}
      <Row className="justify-content-center">
        <Col md={4} sm={6} className="mb-4">
          <Card className="game-card">
            <Image
              src="/Assets/Dashboard/Category/BattleRoyal/BGMI/bgmi.jpg"
              alt="BGMI"
              className="game-image"
            />
            <Card.Body>
              <Card.Title>BGMI</Card.Title>
              <Card.Text>
                Battle Ground Mobile India (BGMI) is a free-to-play battle royale game
                where you fight for survival in a large open world.
              </Card.Text>
              <Button variant="primary" href="/bgmi-details">
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} sm={6} className="mb-4">
          <Card className="game-card">
            <Image
              src="/Assets/Dashboard/Category/BattleRoyal/FreeFire/freefire.jpg"
              alt="Free Fire"
              className="game-image"
            />
            <Card.Body>
              <Card.Title>Free Fire</Card.Title>
              <Card.Text>
                Free Fire is a fast-paced battle royale game where players fight
                in a shrinking map to become the last survivor.
              </Card.Text>
              <Button variant="primary" href="/freefire-details">
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} sm={6} className="mb-4">
          <Card className="game-card">
            <Image
              src="/Assets/Dashboard/Category/BattleRoyal/COD/cod.jpg"
              alt="Call of Duty"
              className="game-image"
            />
            <Card.Body>
              <Card.Title>Call of Duty: Mobile</Card.Title>
              <Card.Text>
                Call of Duty: Mobile brings the classic franchise experience to
                mobile devices with exciting battle royale and multiplayer
                modes.
              </Card.Text>
              <Button variant="primary" href="/cod-details">
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
