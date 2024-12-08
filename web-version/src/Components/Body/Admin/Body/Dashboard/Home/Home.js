import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import {
  FaUsers,
  FaWallet,
  FaPiggyBank,
  FaClock,
  FaUserLock,
} from "react-icons/fa";
import "./Home.css";

export const HomePage = () => {
  const announcements = [
    "Welcome to the Admin Panel!",
    "System maintenance scheduled for Sunday.",
    "New feature: Bulk KYC approval is now live.",
    "Welcome to the Admin Panel!",
    "System maintenance scheduled for Sunday.",
    "New feature: Bulk KYC approval is now live.",
  ];

  const stats = [
    { title: "Total Customers", icon: <FaUsers />, value: 1050 },
    { title: "Today's Join Customers", icon: <FaUsers />, value: 25 },
    { title: "Wallet Recharge Today", icon: <FaWallet />, value: "₹50,000" },
    {
      title: "Total Wallet Balance",
      icon: <FaPiggyBank />,
      value: "₹5,00,000",
    },
    {
      title: "Total Uncleared Wallet Balance",
      icon: <FaPiggyBank />,
      value: "₹20,000",
    },
    { title: "Pending Withdrawal Requests", icon: <FaClock />, value: 5 },

    { title: "Blocked Users", icon: <FaUserLock />, value: 2 },
  ];

  const recentMembers = [
    {
      id: 1,
      customerId: "C12345",
      name: "John Doe",
      date: "2024-11-20",
      time: "14:30",
      employeeId: "EMP101",
    },
    {
      id: 2,
      customerId: "C12346",
      name: "Jane Smith",
      date: "2024-11-20",
      time: "13:20",
      employeeId: "EMP102",
    },
    {
      id: 3,
      customerId: "C12347",
      name: "Sam Wilson",
      date: "2024-11-19",
      time: "17:50",
      employeeId: "EMP103",
    },
  ];

  return (
    <Container fluid className="admin-home">
      {/* Announcements Section */}
      <div className="announcements mb-4">
        <h5>Announcements</h5>
        <div className="announcements-scroll">
          {announcements.map((announcement, index) => (
            <div key={index} className="announcement-item">
              {announcement}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <Row className="mb-4 stats-grid">
        {stats.map((stat, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Card className="stat-card shadow-sm">
              <Card.Body className="d-flex align-items-center">
                <div className="icon-wrapper me-3">{stat.icon}</div>
                <div>
                  <h6 className="stat-title">{stat.title}</h6>
                  <p className="stat-value">{stat.value}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recent Joined Members Section */}
      <div className="recent-members">
        <h5>Recent Joined Members</h5>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Joining Date</th>
              <th>Time</th>
              <th>Employee ID</th>
            </tr>
          </thead>
          <tbody>
            {recentMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.customerId}</td>
                <td>{member.name}</td>
                <td>{member.date}</td>
                <td>{member.time}</td>
                <td>{member.employeeId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};
