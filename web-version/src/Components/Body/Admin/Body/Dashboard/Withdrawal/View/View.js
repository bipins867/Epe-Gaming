import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import { FaLock,FaCheckCircle,FaTimesCircle } from "react-icons/fa";
import "./View.css";

export const ViewPage = () => {
  // Sample Data
  const customerProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    employeeId: "EMP123",
    candidateId: "CAN456",
    joiningDate: "2023-01-15",
  };

  const kycDetails = {
    kycStatus: "Verified",
    panStatus: "Verified",
  };

  const piggyBox = {
    piggyBalance: 12000,
    unclearedBalance: 500,
    interestBalance: 300,
    isFundedFirst: true,
  };

  const bankDetails = {
    bankName: "State Bank of India",
    accountNumber: "1234567890",
    name: "John Doe",
    ifscCode: "SBIN0012345",
  };

  const withdrawalRequests = [
    { id: "REQ001", date: "2024-11-20", amount: 5000, status: "PENDING" },
  ];

  const previousWithdrawalRequests = [
    { id: "REQ002", date: "2024-10-15", amount: 3000, status: "APPROVED" },
    { id: "REQ003", date: "2024-09-20", amount: 4000, status: "REJECTED" },
  ];

  return (
    <div className="customer-view-page">
      {/* Customer Profile Section */}
      <Card className="customer-card">
        <Card.Header className="customer-card-header">
          Customer Profile
        </Card.Header>
        <Card.Body>
          <Table bordered className="customer-view-table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{customerProfile.name}</td>
                <th>Email</th>
                <td>{customerProfile.email}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{customerProfile.phone}</td>
                <th>Employee ID</th>
                <td>{customerProfile.employeeId}</td>
              </tr>
              <tr>
                <th>Candidate ID</th>
                <td>{customerProfile.candidateId}</td>
                <th>Joining Date</th>
                <td>{customerProfile.joiningDate}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* KYC Section */}
      <Card className="customer-card mt-4">
        <Card.Header className="customer-card-header">KYC Details</Card.Header>
        <Card.Body>
          <Table bordered className="customer-view-table">
            <tbody>
              <tr>
                <th>KYC Status</th>
                <td>{kycDetails.kycStatus}</td>
                <th>PAN Status</th>
                <td>{kycDetails.panStatus}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Piggy Box Section */}
      <Card className="customer-card mt-4">
        <Card.Header className="customer-card-header">Piggy Box</Card.Header>
        <Card.Body>
          <Table bordered className="customer-view-table">
            <tbody>
              <tr>
                <th>Piggy Balance</th>
                <td>{piggyBox.piggyBalance}</td>
                <th>Uncleared Balance</th>
                <td>{piggyBox.unclearedBalance}</td>
              </tr>
              <tr>
                <th>Interest Balance</th>
                <td>{piggyBox.interestBalance}</td>
                <th>Is Funded First</th>
                <td>{piggyBox.isFundedFirst ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Bank Details Section */}
      <Card className="customer-card mt-4">
        <Card.Header className="customer-card-header">Bank Details</Card.Header>
        <Card.Body>
          <Table bordered className="customer-view-table">
            <tbody>
              <tr>
                <th>Bank Name</th>
                <td>{bankDetails.bankName}</td>
                <th>Account Number</th>
                <td>{bankDetails.accountNumber}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{bankDetails.name}</td>
                <th>IFSC Code</th>
                <td>{bankDetails.ifscCode}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Withdrawal Requests Section */}
      <Card className="customer-card mt-4">
        <Card.Header className="customer-card-header">
          Withdrawal Requests
        </Card.Header>
        <Card.Body>
          <Table bordered className="customer-view-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Request ID</th>
                <th>Request Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {withdrawalRequests.map((request, index) => (
                <tr key={request.id}>
                  <td>{index + 1}</td>
                  <td>{request.id}</td>
                  <td>{request.date}</td>
                  <td>{request.amount}</td>
                  <td>{request.status}</td>
                  <td>
                  <Button variant="success" size="sm" className="me-2">
            <FaCheckCircle className="me-1" /> Approve
          </Button>
          <Button variant="danger" size="sm" className="me-2">
            <FaTimesCircle className="me-1" /> Reject
          </Button>
          <Button variant="warning" size="sm">
            <FaLock className="me-1" /> Lock
          </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Previous Withdrawal Request History Section */}
      <Card className="customer-card mt-4">
        <Card.Header className="customer-card-header">
          Previous Withdrawal Request History
        </Card.Header>
        <Card.Body>
          <Table bordered className="customer-view-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Request ID</th>
                <th>Request Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {previousWithdrawalRequests.map((request, index) => (
                <tr key={request.id}>
                  <td>{index + 1}</td>
                  <td>{request.id}</td>
                  <td>{request.date}</td>
                  <td>{request.amount}</td>
                  <td>{request.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};
