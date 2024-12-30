import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import "./EventDetails.css";
import {
  getEventInfoHandler,
  updateEventRoomCredentialsHandler,
  updateEventStatusHandler,
} from "../../apiHandler";
import { useAlert } from "../../../../../../../../../UI/Alert/AlertContext";

export const EventDetailsPage = ({
  eventId,
  isInfoUpdated,
  setIsInfoUpdated,
  eventInfo,setEventInfo
}) => {
  const [isEventDataLoading, setIsEventDataLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
 
  const [newStatus, setNewStatus] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [remark, setRemark] = useState("");
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchEventDetails = async () => {
      const response = await getEventInfoHandler(
        eventId,
        setIsEventDataLoading,
        showAlert
      );

      if (response) {
        setEventInfo(response.data); // Assuming response.data contains event details
        setRoomId(response.data.roomId || ""); // Pre-fill if data exists
        setRoomPassword(response.data.roomPassword || ""); // Pre-fill if data exists
      }
    };

    fetchEventDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInfoUpdated]);

  const handleUpdateRoomCredentials = async () => {
    if (roomId === "" || roomPassword === "") {
      alert("Please enter room credentials!");
    }

    const response = await updateEventRoomCredentialsHandler(
      eventId,
      roomId,
      roomPassword,
      setIsUpdating,
      showAlert
    );

    if (response) {
      showAlert("info", "Info!", "Room Credentials Updated Successfully!");
    }
  };

  // Update Event Status
  const handleUpdateEventStatus = async () => {
    if (!newStatus) {
      showAlert("error", "Error!", "Please select a new status.");
      return;
    }

    if (
      (newStatus === "rescheduled" && !rescheduleTime) ||
      ((newStatus === "rescheduled" || newStatus === "cancelled") && !remark)
    ) {
      showAlert(
        "error",
        "Error!",
        "Please provide all required fields (time/remark)."
      );
      return;
    }

    const response = await updateEventStatusHandler(
      eventId,
      newStatus,
      rescheduleTime,
      remark,
      setIsStatusUpdating,
      showAlert
    );

    if (response) {
      showAlert("info", "Success!", "Event status updated successfully!");
      setRescheduleTime("");
      setRemark("");
      setIsInfoUpdated(isInfoUpdated + 1);
    }
  };

  if (isEventDataLoading || !eventInfo) {
    return (
      <div className="loading-screen text-center">
        <Spinner animation="border" role="status" className="loading-spinner">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <h4 className="loading-text">Fetching Event Details...</h4>
      </div>
    );
  }

  // Determine allowed status options
  const getStatusOptions = () => {
    const statusOptions = {
      upcoming: ["inReview", "cancelled", "rescheduled"],
      inReview: ["cancelled", "rescheduled"],
      rescheduled: ["cancelled", "rescheduled", "inReview"],
    };
    return statusOptions[eventInfo.status] || [];
  };

  if (isEventDataLoading) {
    return (
      <>
        <div className="loading-screen text-center">
          <Spinner animation="border" role="status" className="loading-spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h4 className="loading-text">Fetching Events Details...</h4>
        </div>
      </>
    );
  }

  return (
    <>
      <Row>
        <Col>
          <h1 className="info-title text-center mb-4">Event Details</h1>
        </Col>
      </Row>

      {/* Event Information */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <h5>Event Information</h5>
              <ul className="list-unstyled">
                <li>
                  <strong>Title:</strong> {eventInfo.tittle}
                </li>
                <li>
                  <strong>Description:</strong> {eventInfo.description}
                </li>
                <li>
                  <strong>Event ID:</strong> {eventInfo.eventId}
                </li>
                <li>
                  <strong>Event Type:</strong> {eventInfo.eventType}
                </li>
                <li>
                  <strong>Match Type:</strong> {eventInfo.matchType}
                </li>
                <li>
                  <strong>Map:</strong> {eventInfo.map}
                </li>
                <li>
                  <strong>Squad Type:</strong> {eventInfo.squadType}
                </li>
                <li>
                  <strong>Version:</strong> {eventInfo.version}
                </li>
                <li>
                  <strong>Status:</strong> {eventInfo.status}
                </li>
              </ul>
            </Col>
            <Col md={6}>
              <h5>Prize & Entry Details</h5>
              <ul className="list-unstyled">
                <li>
                  <strong>Entry Fee:</strong> {eventInfo.entryFee}
                </li>
                <li>
                  <strong>Per Kill:</strong> {eventInfo.perKill}
                </li>
                <li>
                  <strong>Prize Pool 1:</strong> {eventInfo.prizePool_1}
                </li>
                <li>
                  <strong>Prize Pool 2:</strong>{" "}
                  {eventInfo.prizePool_2 || "N/A"}
                </li>
                <li>
                  <strong>Prize Pool 3:</strong>{" "}
                  {eventInfo.prizePool_3 || "N/A"}
                </li>
              </ul>
            </Col>
          </Row>
          {/* Remark Row */}
          {eventInfo.remark && (
            <Row className="mt-3">
              <Col>
                <Card className="bg-light">
                  <Card.Body>
                    <h6>
                      <strong>Remark:</strong> {eventInfo.remark}
                    </h6>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>

      {/* Room ID and Password Form */}
      <Card className="mb-4">
        <Card.Body>
          <h5>Set Room Details</h5>
          {["upcoming", "rescheduled"].includes(eventInfo.status) ? (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="roomId">
                    <Form.Label>Room ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Room ID"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="roomPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Password"
                      value={roomPassword}
                      onChange={(e) => setRoomPassword(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Button
                    variant="primary"
                    onClick={handleUpdateRoomCredentials}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          ) : (
            <ul className="list-unstyled">
              <li>
                <strong>Room ID:</strong> {roomId}
              </li>
              <li>
                <strong>Password:</strong> {roomPassword}
              </li>
            </ul>
          )}
        </Card.Body>
      </Card>

      {/* Update Status Section */}
      <Card className="mb-4">
        <Card.Body>
          <h5>Update Event Status</h5>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="statusSelect">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="">Select New Status</option>
                    {getStatusOptions().map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              {(newStatus === "rescheduled" || newStatus === "cancelled") && (
                <Col md={6}>
                  <Form.Group controlId="remark">
                    <Form.Label>Remark</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Remark"
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              )}
            </Row>
            {newStatus === "rescheduled" && (
              <Row className="mt-3">
                <Col md={6}>
                  <Form.Group controlId="rescheduleTime">
                    <Form.Label>Rescheduled Time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={rescheduleTime}
                      onChange={(e) => setRescheduleTime(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            )}
            <Row className="mt-3">
              <Col>
                <Button
                  variant="primary"
                  onClick={handleUpdateEventStatus}
                  disabled={isStatusUpdating}
                >
                  {isStatusUpdating ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Update Status"
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
