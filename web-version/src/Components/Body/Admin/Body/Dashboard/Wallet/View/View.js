import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
} from "react-bootstrap";
import { FaPlus, FaMinus, FaSnowflake, FaUndo, FaTrash } from "react-icons/fa";
import "./View.css";

const f1 = [
  {
    id: 1,
    date: "2024-11-21",
    time: "10:45 AM",
    amount: 500,
    remark: "Pending Freeze 1",
  },
  {
    id: 2,
    date: "2024-11-20",
    time: "02:30 PM",
    amount: 1000,
    remark: "Pending Freeze 2",
  },
];

const th1 = [
  {
    id: 1,
    date: "2024-11-20",
    time: "12:45 PM",
    transactionId: "TX12345",
    remark: "Fund Added",
    debit: null,
    credit: 500,
    balance: 1000,
  },
  // Add more transactions
];

const f2 = [
  {
    id: 1,
    date: "2024-11-20",
    time: "01:00 PM",
    amount: 200,
    remark: "Freeze for security",
  },
  // Add more freeze records
];

export const ViewPage = () => {
  const [form, setForm] = useState({
    addAmount: "",
    addRemark: "",
    deductAmount: "",
    deductRemark: "",
    freezeAmount: "",
    freezeRemark: "",
  });

  const [transactionHistory, setTransactionHistory] = useState([]);
  const [freezeHistory, setFreezeHistory] = useState([]);
  const [recentFreezes, setRecentFreezes] = useState([]);

  useEffect(() => {
    setRecentFreezes(f1);
    setTransactionHistory(th1);
    setFreezeHistory(f2);
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (type) => {
    console.log(`Submit ${type}`, form);
    // Add your submission logic here
  };

  return (
    <Container fluid className="piggybox-view-container">
      {/* Customer Details */}
      <Card className="piggybox-card">
        <Card.Header className="piggybox-card-header">
          Customer Details
        </Card.Header>
        <Card.Body>
          <Table bordered className="piggybox-details-table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>John Doe</td>
                <th>Email</th>
                <td>john.doe@example.com</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>9876543210</td>
                <th>Employee ID</th>
                <td>EMP123</td>
              </tr>
              <tr>
                <th>Candidate ID</th>
                <td>CAND456</td>
                <th>Piggy Balance</th>
                <td>₹10,000</td>
              </tr>
              <tr>
                <th>Piggy Uncleared Balance</th>
                <td>₹2,000</td>
                <th>Piggy Interest Balance</th>
                <td>₹1,200</td>
              </tr>
              <tr>
                <th>Date of Joining</th>
                <td>2023-01-15</td>
                <th>KYC Status</th>
                <td>Approved</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add Funds, Deduct Funds, Freeze Funds */}
      <Row className="mt-4">
        {["Add", "Deduct", "Freeze"].map((action) => (
          <Col md={4} key={action}>
            <Card className="piggybox-card">
              <Card.Header className="piggybox-card-header">
                {action} Funds
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={`Enter ${action.toLowerCase()} amount`}
                      name={`${action.toLowerCase()}Amount`}
                      value={form[`${action.toLowerCase()}Amount`]}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Remark</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter remark"
                      name={`${action.toLowerCase()}Remark`}
                      value={form[`${action.toLowerCase()}Remark`]}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button
                    variant={
                      action === "Add"
                        ? "success"
                        : action === "Deduct"
                        ? "danger"
                        : "info"
                    }
                    onClick={() => handleFormSubmit(action.toLowerCase())}
                  >
                    {action}{" "}
                    {action === "Add" ? (
                      <FaPlus />
                    ) : action === "Deduct" ? (
                      <FaMinus />
                    ) : (
                      <FaSnowflake />
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recent Pending Freezes */}
      <Card className="piggybox-card mt-4">
        <Card.Header className="piggybox-card-header">
          Recent Pending Freezes
        </Card.Header>
        <Card.Body>
          <Table bordered className="piggybox-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Time</th>
                <th>Amount</th>
                <th>Remark</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentFreezes.map((freeze) => (
                <tr key={freeze.id}>
                  <td>{freeze.id}</td>
                  <td>{freeze.date}</td>
                  <td>{freeze.time}</td>
                  <td>₹{freeze.amount}</td>
                  <td>{freeze.remark}</td>
                  <td>
                    <Button variant="warning" size="sm">
                      Refund <FaUndo />
                    </Button>{" "}
                    <Button variant="danger" size="sm">
                      Deduct <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Transaction History */}
      <Card className="piggybox-card mt-4">
        <Card.Header className="piggybox-card-header">
          Transaction History
        </Card.Header>
        <Card.Body>
          <Form className="mb-3">
            <Row>
              <Col md={4}>
                <Form.Control type="date" placeholder="From Date" />
              </Col>
              <Col md={4}>
                <Form.Control type="date" placeholder="To Date" />
              </Col>
              <Col md={2}>
                <Form.Control as="select">
                  <option>20</option>
                  <option>50</option>
                  <option>100</option>
                </Form.Control>
              </Col>
              <Col md={2}>
                <Button variant="primary">Get Result</Button>
              </Col>
            </Row>
          </Form>
          <Table bordered className="piggybox-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Time</th>
                <th>Transaction ID</th>
                <th>Remark</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((transaction, index) => (
                <tr key={transaction.id}>
                  <td>{index + 1}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.time}</td>
                  <td>{transaction.transactionId}</td>
                  <td>{transaction.remark}</td>
                  <td className="text-danger">{transaction.debit || "-"}</td>
                  <td className="text-success">{transaction.credit || "-"}</td>
                  <td>{transaction.balance}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Freeze History */}
      <Card className="piggybox-card mt-4">
        <Card.Header className="piggybox-card-header">
          Freeze History
        </Card.Header>
        <Card.Body>
          <Table bordered className="piggybox-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Time</th>
                <th>Amount</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {freezeHistory.map((freeze, index) => (
                <tr key={freeze.id}>
                  <td>{index + 1}</td>
                  <td>{freeze.date}</td>
                  <td>{freeze.time}</td>
                  <td>{freeze.amount}</td>
                  <td>{freeze.remark}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};
