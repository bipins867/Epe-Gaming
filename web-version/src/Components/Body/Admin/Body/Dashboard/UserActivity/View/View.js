import React, { useState } from "react";
import { Container, Row, Col, Card, Table, Form, Button } from "react-bootstrap";
import "./View.css";

export const ViewPage = () => {
  // Dummy Customer Details
  const customerDetails = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    employeeId: "EMP123",
    candidateId: "CUST001",
    piggyBalance: "₹12,345.67",
    kycStatus: "Approved",
  };

  // State for filtering recent activities
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    limit: 20,
  });

  const [activityLogs] = useState([
    {
      id: 1,
      date: "2024-11-20",
      time: "10:30 AM",
      type: "Login",
      description: "User logged in successfully",
      ipAddress: "192.168.1.1",
      location: "New York, USA",
      deviceType: "Chrome on Windows",
    },
    {
      id: 2,
      date: "2024-11-19",
      time: "03:15 PM",
      type: "Transaction",
      description: "Added funds to Piggybox",
      ipAddress: "192.168.1.2",
      location: "California, USA",
      deviceType: "Safari on macOS",
    },
    // Add more dummy data as needed
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // Logic for filtering activity logs (API integration or local filtering)
    console.log("Filters applied:", filters);
  };

  return (
    <Container fluid className="customer-view-page mt-4">
      <h4 className="mb-4 text-primary">Customer Details</h4>

      {/* Customer Details Section */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <p>
                <strong>Name:</strong> {customerDetails.name}
              </p>
              <p>
                <strong>Email:</strong> {customerDetails.email}
              </p>
              <p>
                <strong>Phone:</strong> {customerDetails.phone}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Employee ID:</strong> {customerDetails.employeeId}
              </p>
              <p>
                <strong>Candidate ID:</strong> {customerDetails.candidateId}
              </p>
              <p>
                <strong>Piggy Balance:</strong> {customerDetails.piggyBalance}
              </p>
              <p>
                <strong>KYC Status:</strong> {customerDetails.kycStatus}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Activity Logs Section */}
      <Card className="shadow-sm mb-4">
        <Card.Header>
          <h5 className="text-secondary">Recent User Activity</h5>
        </Card.Header>
        <Card.Body>
          {/* Filters */}
          <Form onSubmit={handleFilterSubmit} className="mb-4">
            <Row className="align-items-end">
              <Col md={3}>
                <Form.Group controlId="fromDate">
                  <Form.Label>From Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="fromDate"
                    value={filters.fromDate}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="toDate">
                  <Form.Label>To Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="toDate"
                    value={filters.toDate}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="limit">
                  <Form.Label>Limit</Form.Label>
                  <Form.Select
                    name="limit"
                    value={filters.limit}
                    onChange={handleFilterChange}
                  >
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Button variant="primary" type="submit" className="w-100">
                  Get Results
                </Button>
              </Col>
            </Row>
          </Form>

          {/* Activity Table */}
          <Table bordered responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Time</th>
                <th>Type</th>
                <th>Description</th>
                <th>IP Address</th>
                <th>Location</th>
                <th>Device Type</th>
              </tr>
            </thead>
            <tbody>
              {activityLogs.slice(0, filters.limit).map((log, index) => (
                <tr key={log.id}>
                  <td>{index + 1}</td>
                  <td>{log.date}</td>
                  <td>{log.time}</td>
                  <td>{log.type}</td>
                  <td>{log.description}</td>
                  <td>{log.ipAddress}</td>
                  <td>{log.location}</td>
                  <td>{log.deviceType}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};
