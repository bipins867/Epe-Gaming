import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import "./Announcement.css";

export const AnnouncementPage = () => {
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      message: "System maintenance scheduled for Sunday.",
      type: "General",
      date: "2024-11-20",
      time: "10:30 AM",
      status: "Active",
    },
    {
      id: 2,
      message: "New feature: Bulk KYC approval is now live.",
      type: "General",
      date: "2024-11-19",
      time: "02:15 PM",
      status: "Active",
    },
    {
      id: 3,
      message: "Contact support for any issues!",
      type: "General",
      date: "2024-11-18",
      time: "04:00 PM",
      status: "Inactive",
    },
  ]);

  const handleCreateAnnouncement = () => {
    if (newAnnouncement.trim() === "") return;
    const newId = announcements.length + 1;
    const now = new Date();
    const newAnnounce = {
      id: newId,
      message: newAnnouncement,
      type: "General",
      date: now.toISOString().split("T")[0],
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "Active",
    };
    setAnnouncements([newAnnounce, ...announcements]);
    setNewAnnouncement("");
  };

  const handleAction = (id, action) => {
    setAnnouncements((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: action === "deactivate" ? "Inactive" : "Active",
            }
          : item
      )
    );
    if (action === "delete") {
      setAnnouncements((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <Container fluid>
      {/* Announcements Section */}
      <div className="announcements">
        <h5>Announcements</h5>
        <div className="announcements-scroll">
          {announcements
            .filter((announcement) => announcement.status === "Active")
            .map((announcement) => (
              <div key={announcement.id} className="announcement-item">
                {announcement.message}
              </div>
            ))}
        </div>
      </div>

      {/* Create Announcement Section */}
      <div className="create-announcement">
        <h5>Create Announcement</h5>
        <Form>
          <Row>
            <Col md={10}>
              <Form.Control
                type="text"
                placeholder="Enter your announcement message..."
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
              />
            </Col>
            <Col md={2}>
              <Button
                variant="primary"
                onClick={handleCreateAnnouncement}
                block="true"
              >
                Create
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      {/* Announcement List Section */}
      <div className="announcement-table">
        <h5>Announcement List</h5>
        <Table bordered responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Message</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement.id}>
                <td>{announcement.id}</td>
                <td>{announcement.message}</td>
                <td>{announcement.type}</td>
                <td>{announcement.date}</td>
                <td>{announcement.time}</td>
                <td>{announcement.status}</td>
                <td className="announcement-table-actions">
                  <Button
                    variant={announcement.status === "Active" ? "warning" : "success"}
                    size="sm"
                    onClick={() =>
                      handleAction(
                        announcement.id,
                        announcement.status === "Active"
                          ? "deactivate"
                          : "activate"
                      )
                    }
                  >
                    {announcement.status === "Active" ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleAction(announcement.id, "delete")}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};
