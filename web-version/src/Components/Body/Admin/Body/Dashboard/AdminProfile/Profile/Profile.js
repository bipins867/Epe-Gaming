import React from "react";
import { Container, Card, Badge, Form, Button } from "react-bootstrap";
import "./Profile.css";

export const ProfilePage = () => {
  const roles = ["Customers", "KYC"]; // Example roles

  return (
    <Container fluid className="profile-page-container">
      {/* Profile Information */}
      <h4 className="mb-4 profile-page-title">Profile Information</h4>
      <Card className="profile-info-card">
        <Card.Body>
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Email:</strong> john.doe@example.com
          </p>
          <h6 className="roles-title">Roles:</h6>
          <div className="roles-pill-container">
            {roles.map((role, index) => (
              <Badge key={index} className="role-pill" pill bg="primary">
                {role}
              </Badge>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Reset Password Form */}
      <h4 className="mt-5 mb-4 profile-page-title">Reset Password</h4>
      <Card className="reset-password-card">
        <Card.Body>
          <Form>
            <Form.Group controlId="oldPassword" className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control type="password" placeholder="Enter old password" />
            </Form.Group>
            <Form.Group controlId="newPassword" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Enter new password" />
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your new password"
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
