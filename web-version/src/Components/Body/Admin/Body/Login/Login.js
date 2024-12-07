import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "./Login.css"; // Importing CSS for styling

export const AdminLoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., API call or state update
    console.log("User ID:", userId, "Password:", password);
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="login-card shadow-lg">
            <Card.Body>
              <h2 className="text-center mb-4">Admin Login</h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="userId">
                  <Form.Label>User ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
