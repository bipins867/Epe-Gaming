import { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import "./Activity.css";

export const ActivityPage = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [limit, setLimit] = useState(20);

  const adminActivities = [
    {
      id: 1,
      date: "2024-11-20",
      time: "10:00 AM",
      type: "Update",
      description: "Changed user role",
      affectedUserId: "USER123",
      ipAddress: "192.168.1.1",
      location: "New York, USA",
      deviceType: "Desktop",
    },
  ];

  return (
    <Container fluid className="activity-page-container">
      <h4 className="mb-4 activity-page-title">Admin Activity</h4>
      <Row className="mb-4 filters-row">
        {/* Filters */}
        <Col md={3}>
          <Form.Group>
            <Form.Label>From Date</Form.Label>
            <Form.Control
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="custom-input"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>To Date</Form.Label>
            <Form.Control
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="custom-input"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Limit</Form.Label>
            <Form.Select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="custom-select"
            >
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3} className="d-flex align-items-end">
          <Button variant="primary" className="custom-button">
            Get Results
          </Button>
        </Col>
      </Row>

      {/* Admin Activity Table */}
      <Table bordered hover responsive className="activity-table">
        <thead className="table-header">
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Time</th>
            <th>Type</th>
            <th>Description</th>
            <th>Affected User ID</th>
            <th>IP Address</th>
            <th>Location</th>
            <th>Device Type</th>
          </tr>
        </thead>
        <tbody>
          {adminActivities.map((activity, index) => (
            <tr key={activity.id}>
              <td>{index + 1}</td>
              <td>{activity.date}</td>
              <td>{activity.time}</td>
              <td>{activity.type}</td>
              <td>{activity.description}</td>
              <td>{activity.affectedUserId}</td>
              <td>{activity.ipAddress}</td>
              <td>{activity.location}</td>
              <td>{activity.deviceType}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
