import React from "react";
import { Card, Table, Row, Col } from "react-bootstrap";
import "./View.css"; // Include unique styles here

const userInfo = {
  name: "John Doe",
  customerId: "CUST12345",
  isFundedFirst: true,
  byReferralId: "REF56789",
  byReferralName: "Jane Smith",
  totalReferrals: 10,
  pendingReferrals: 2,
};

const referralHistory = [
  {
    id: 1,
    customerId: "CUST67890",
    customerName: "Alice Johnson",
    status: "Completed",
    dateOfJoining: "2024-01-10",
    dateOfCompletion: "2024-03-15",
  },
  {
    id: 2,
    customerId: "CUST54321",
    customerName: "Bob Brown",
    status: "Pending",
    dateOfJoining: "2024-02-20",
    dateOfCompletion: null,
  },
];

export const ViewPage = () => {
  return (
    <div className="referral-page">
      {/* User Information Section */}
      <Card className="referral-card mb-4">
        <Card.Header className="referral-card-header">User Information</Card.Header>
        <Card.Body>
          <Row className="user-info-row">
            <Col md={6} className="info-item">
              <strong>Name:</strong> {userInfo.name}
            </Col>
            <div className="vertical-divider" />
            <Col md={6} className="info-item">
              <strong>Customer ID:</strong> {userInfo.customerId}
            </Col>
            <hr className="horizontal-divider" />
            <Col md={6} className="info-item">
              <strong>Is Funded First:</strong> {userInfo.isFundedFirst ? "Yes" : "No"}
            </Col>
            <div className="vertical-divider" />
            <Col md={6} className="info-item">
              <strong>By Referral ID:</strong> {userInfo.byReferralId}
            </Col>
            <hr className="horizontal-divider" />
            <Col md={6} className="info-item">
              <strong>By Referral Name:</strong> {userInfo.byReferralName}
            </Col>
            <div className="vertical-divider" />
            <Col md={6} className="info-item">
              <strong>Total Referrals:</strong> {userInfo.totalReferrals}
            </Col>
            <hr className="horizontal-divider" />
            <Col md={6} className="info-item">
              <strong>Pending Referrals:</strong> {userInfo.pendingReferrals}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Referral History Section */}
      <Card className="referral-card">
        <Card.Header className="referral-card-header">Referral History</Card.Header>
        <Card.Body>
          <Table bordered className="referral-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Status</th>
                <th>Date of Joining</th>
                <th>Date of Completion</th>
              </tr>
            </thead>
            <tbody>
              {referralHistory.map((referral, index) => (
                <tr key={referral.id}>
                  <td>{index + 1}</td>
                  <td>{referral.customerId}</td>
                  <td>{referral.customerName}</td>
                  <td>{referral.status}</td>
                  <td>{referral.dateOfJoining}</td>
                  <td>{referral.dateOfCompletion || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};
