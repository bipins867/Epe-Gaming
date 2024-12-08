import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
  InputGroup,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa"; // Import lock icon
import "./Search.css";
import { Link } from "react-router-dom";

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(20);
  const [customers] = useState([
    {
      id: 1,
      customerId: "CUST001",
      name: "John Doe",
      date: "2024-11-20",
      time: "10:00 AM",
      employeeId: "EMP123",
    },
    {
      id: 2,
      customerId: "CUST002",
      name: "Jane Smith",
      date: "2024-11-19",
      time: "02:30 PM",
      employeeId: "EMP124",
    },
    {
      id: 3,
      customerId: "CUST003",
      name: "David Brown",
      date: "2024-11-18",
      time: "11:45 AM",
      employeeId: "EMP125",
    },
    // Add more dummy data as needed
  ]);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container fluid className="mt-4">
      <h5 className="mb-4 text-primary">Customer Management</h5>

      {/* Search and Limit Section */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            {/* Search Section */}
            <Col md={8}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search by Name/CustomerId/EmployeeId etc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="primary" className="search-button">
                  <FaSearch />
                </Button>
              </InputGroup>
            </Col>

            {/* Limit Dropdown */}
            <Col md={4} className="checking d-flex align-items-center">
              <Form.Label className="me-2 mb-0">Limit:</Form.Label>
              <Form.Select
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              >
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Customer Table Section */}
      <Card className="shadow-sm">
        <Card.Body>
          <Row className="d-flex justify-content-between align-items-center mb-4">
            {/* Customer List Header */}
            <Col md={9}>
              <h6 className="mb-0 text-secondary">Customer List</h6>
            </Col>
          </Row>

          {/* Table */}
          <Table bordered responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Employee ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.slice(0, limit).map((customer, index) => (
                <tr key={customer.id}>
                  <td>{index + 1}</td>
                  <td>{customer.customerId}</td>
                  <td>{customer.name}</td>
                  <td>{customer.date}</td>
                  <td>{customer.time}</td>
                  <td>{customer.employeeId}</td>
                  <td>
                    <Link to={`./view/${customer.customerId}`}>
                      <span className="btn btn-info btn-sm">View</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};
