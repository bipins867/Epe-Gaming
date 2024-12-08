import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Table } from "react-bootstrap";
import "./View.css";

export const ViewPage = () => {
  const [blocked, setBlocked] = useState(false);

  return (
    <Container fluid>
      {/* Customer Details Section */}
      <Card className="mb-3">
        <Card.Header className="customer-details">Customer Details</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={3}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" defaultValue="John Doe" />
              </Col>
              <Col md={3}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" defaultValue="johndoe@example.com" />
              </Col>
              <Col md={3}>
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" defaultValue="9876543210" />
              </Col>
              <Col md={3}>
                <Form.Label>Employee ID</Form.Label>
                <Form.Control type="text" defaultValue="EMP123456" />
              </Col>
            </Row>
            <Button variant="primary" className="mt-3">Update</Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Static Info Section */}
      <Card className="mb-3">
        <Card.Header className="static-info">Customer Static Info</Card.Header>
        <Card.Body>
          <Table bordered>
            <tbody>
              <tr>
                <td>Candidate ID</td>
                <td>123456</td>
                <td>Is Requested Closure</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Is Active</td>
                <td>Yes</td>
                <td>Referred By ID</td>
                <td>7890</td>
              </tr>
              <tr>
                <td>Date of Joining</td>
                <td>2024-01-15</td>
                <td>Employee ID</td>
                <td>EMP123456</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Blocked Status Section */}
      <Card className="mb-3">
        <Card.Header className="block-status">Blocked Status</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Label>Block User</Form.Label>
              <Form.Check
                type="switch"
                id="block-status"
                label={blocked ? "User Blocked" : "User Active"}
                checked={blocked}
                onChange={() => setBlocked(!blocked)}
              />
            </Col>
            <Col md={6}>
              <Button variant="primary" className="mt-3">Update Status</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* PiggyBox Info Section */}
      <Card className="mb-3">
        <Card.Header className="piggybox-info">PiggyBox Info</Card.Header>
        <Card.Body>
          <Table bordered>
            <tbody>
              <tr>
                <th>PiggyBalance</th>
                <td>1000.00</td>
                <th>Uncleared Balance</th>
                <td>200.00</td>
              </tr>
              <tr>
                <th>Interest Balance</th>
                <td>50.00</td>
                <th>Is Funded First</th>
                <td>Yes</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Bank Details Section */}
      <Card className="mb-3">
        <Card.Header className="bank-details">Bank Details</Card.Header>
        <Card.Body>
          <Table bordered>
            <tbody>
              <tr>
                <th>Bank Name</th>
                <td>XYZ Bank</td>
                <th>Account Number</th>
                <td>1234567890</td>
              </tr>
              <tr>
                <th>Account Holder Name</th>
                <td>John Doe</td>
                <th>IFSC Code</th>
                <td>XYZB123456</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Address Section */}
      <Card className="mb-3">
        <Card.Header className="address-info">Address</Card.Header>
        <Card.Body>
          <Table bordered>
            <tbody>
              <tr>
                <td>Address Line 1</td>
                <td>123 Main St</td>
                <td>Address Line 2</td>
                <td>Apt 4B</td>
              </tr>
              <tr>
                <td>State</td>
                <td>California</td>
                <td>Pincode</td>
                <td>90001</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};
