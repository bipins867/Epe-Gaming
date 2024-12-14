import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Spinner,
} from "react-bootstrap";
import "./Announcement.css";
import { useAlert } from "../../../../../UI/Alert/AlertContext";
import {
  createAnnouncementHandler,
  fetchAnnouncementHandler,
  updateAnnouncementHandler,
  deleteAnnouncementHandler,
} from "./apiHandler";

export const AnnouncementPage = () => {
  const [isUpdated, setIsUpdated] = useState(0);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false); // For fetching announcements
  const [creatingAnnouncement, setCreatingAnnouncement] = useState(false); // For creating announcements
  const [updatingAnnouncements, setUpdatingAnnouncements] = useState({}); // For specific update actions
  const [deletingAnnouncements, setDeletingAnnouncements] = useState({}); // For specific delete actions
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const response = await fetchAnnouncementHandler(
        setLoadingAnnouncements,
        showAlert
      );

      if (response) {
        const { announcements } = response;
        setAnnouncements(announcements);
      }
    };

    fetchAnnouncements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated]);

  const handleCreateAnnouncement = async () => {
    if (newAnnouncement.trim() === "") return;

    const response = await createAnnouncementHandler(
      newAnnouncement,
      "normal",
      setCreatingAnnouncement,
      showAlert
    );

    if (response) {
      setIsUpdated(isUpdated + 1);
    }
  };

  const handleUpdateAnnouncement = async (id, isActive) => {
    if (!id) return;

    const response = await updateAnnouncementHandler(
      id,
      isActive,
      setUpdatingAnnouncements,
      showAlert
    );

    if (response) {
      setIsUpdated(isUpdated + 1);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!id) return;

    const response = await deleteAnnouncementHandler(
      id,
      setDeletingAnnouncements,
      showAlert
    );

    if (response) {
      setIsUpdated(isUpdated + 1);
    }
  };

  if (loadingAnnouncements) {
    return (
      <>
        {" "}
        <div className="loading-screen text-center">
          <Spinner animation="border" role="status" className="loading-spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h4 className="loading-text">Fetching Announcement Details...</h4>
        </div>
      </>
    );
  }

  return (
    <Container fluid>
      {/* Announcements Section */}
      <div className="announcements">
        <h5>Announcements</h5>
        <div className="announcements-scroll">
          {announcements
            .filter((announcement) => announcement.isActive)
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
                disabled={creatingAnnouncement}
              >
                {creatingAnnouncement ? (
                  <Spinner as="span" animation="border" size="sm" />
                ) : (
                  "Create"
                )}
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
                <td>{new Date(announcement.updatedAt).toLocaleDateString()}</td>
                <td>{new Date(announcement.updatedAt).toLocaleTimeString()}</td>
                <td>{announcement.isActive ? "Active" : "Inactive"}</td>
                <td className="announcement-table-actions">
                  <Button
                    variant={announcement.isActive ? "warning" : "success"}
                    size="sm"
                    onClick={() =>
                      handleUpdateAnnouncement(
                        announcement.id,
                        !announcement.isActive
                      )
                    }
                    disabled={!!updatingAnnouncements[announcement.id]}
                  >
                    {updatingAnnouncements[announcement.id] ? (
                      <Spinner as="span" animation="border" size="sm" />
                    ) : announcement.isActive ? (
                      "Deactivate"
                    ) : (
                      "Activate"
                    )}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                    disabled={!!deletingAnnouncements[announcement.id]}
                  >
                    {deletingAnnouncements[announcement.id] ? (
                      <Spinner as="span" animation="border" size="sm" />
                    ) : (
                      "Delete"
                    )}
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
