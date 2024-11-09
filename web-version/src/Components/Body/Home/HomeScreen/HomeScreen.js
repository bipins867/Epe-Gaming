import React from 'react';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import './HomeScreen.css'; // Custom CSS for additional styling

export const HomeScreen = () => {
  // Dynamically set the background image
  const homePageBackgroundStyle = {
    backgroundImage: 'url("/Assets/Dashboard/Category/BattleRoyal/battleRoyal.jpg")', // Replace with your image path
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed", // Keeps the background fixed while scrolling
    padding: "40px 20px",
  };

  return (
    <Container className="home-page" style={homePageBackgroundStyle}>
      <Row className="justify-content-center text-center">
        <Col md={8}>
          {/* Blurred background section */}
          <div className="blurred-content">
            {/* PPL Logo Image */}
            <Image
              src="/Assets/Logo/Brand/ppl-logo-half.png"
              alt="PPL Gaming Logo"
              width={200}
              className="mb-4"
            />
            
            <h1 className="display-3 text-white">PPL Gaming</h1>
            <p className="lead text-white">
              Welcome to the PRO PLAY LEAGUE – a skill-based gaming platform where players compete and win rewards!
            </p>
          </div>

          <Card className="bg-dark text-white mb-4">
            <Card.Body>
              <Card.Title className="font-weight-bold">Download Now</Card.Title>
              <Card.Text>
                Get the PPL Gaming app today and start playing in exciting mobile gaming tournaments!
              </Card.Text>
              <Row className="justify-content-center">
                <Col xs={6} sm={4} md={3} className="mb-3">
                  <Button 
                    variant="outline-light" 
                    href="https://www.apple.com/app-store/" 
                    className="d-flex align-items-center justify-content-center"
                    target="_blank"
                  >
                    <Image
                      src="/Assets/Logo/HomeScreen/ios.png"
                      alt="iOS Download"
                      width={48}
                      height={48}
                      className="me-2"
                    />
                    <span>Download for iOS</span>
                  </Button>
                </Col>
                <Col xs={6} sm={4} md={3}>
                  <Button 
                    variant="outline-light" 
                    href="https://play.google.com/store" 
                    className="d-flex align-items-center justify-content-center"
                    target="_blank"
                  >
                    <Image
                      src="/Assets/Logo/HomeScreen/android.png"
                      alt="Android Download"
                      width={48}
                      height={48}
                      className="me-2"
                    />
                    <span>Download for Android</span>
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-white">
            <Card.Body>
              <Card.Title className="font-weight-bold">Why Choose PPL Gaming?</Card.Title>
              <Card.Text>
                - Competitive Tournaments<br />
                - Skill-based Gameplay<br />
                - Safe & Secure Transactions<br />
                - Play & Win Exciting Rewards
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
