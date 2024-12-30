import React, { useState } from "react";
import { Row, Col, Button, Form, Spinner } from "react-bootstrap";
import "./CreateEvent.css";
import { useAlert } from "../../../../../../../../../UI/Alert/AlertContext";
import { createEventHandler } from "../../apiHandler";

export const CreateEventPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [matchType, setMatchType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showAlert } = useAlert();

  const handleMatchTypeChange = (e) => setMatchType(e.target.value);
  const toggleForm = () => setShowForm((prev) => !prev);

  // Handler function for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(e.target); // Get form data
    const data = Object.fromEntries(formData.entries()); // Convert to an object

    const response = await createEventHandler(
      { ...data, gameId: "1", eventType: "hosted" },
      setIsSubmitting,
      showAlert
    );

    if (response) {
      setShowForm(false);
      showAlert("info", "Success!", "Event created Successfully!");
    }
  };

  return (
    <>
      {/* Title and Create Event Button */}
      <Row className="mb-3">
        <Col>
          <h1 className="page-tittle">Hosted Events</h1>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={toggleForm}>
            {showForm ? "Cancel" : "Create Event"}
          </Button>
        </Col>
      </Row>
      {showForm && (
        <div className="event-form-container mb-4">
          <h3>Create Event</h3>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="eventTitle" className="mb-3">
                  <Form.Label>Tittle</Form.Label>
                  <Form.Control
                    name="tittle"
                    type="text"
                    placeholder="Enter event tittle"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="eventDescription" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    as="textarea"
                    rows={2}
                    placeholder="Enter event description"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Match Type and Map Selection */}
            <Row>
              <Col md={4}>
                <Form.Group controlId="eventType" className="mb-3">
                  <Form.Label>Event Type</Form.Label>
                  <Form.Control
                    type="text"
                    value="Hosted"
                    name="eventType"
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="matchType" className="mb-3">
                  <Form.Label>Match Type</Form.Label>
                  <Form.Select
                    name="matchType"
                    onChange={handleMatchTypeChange}
                    required
                  >
                    <option value="">Select Match Type</option>
                    <option value="ranked">Ranked</option>
                    <option value="unranked">Unranked</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="map" className="mb-3">
                  <Form.Label>Map</Form.Label>
                  <Form.Select name="map" disabled={!matchType} required>
                    <option value="">Select Map</option>
                    {matchType === "ranked" &&
                      [
                        "Erangel",
                        "Livik",
                        "Miramar",
                        "Sanhok",
                        "Vikendi",
                        "Karakin",
                      ].map((map) => (
                        <option key={map} value={map.toLowerCase()}>
                          {map}
                        </option>
                      ))}
                    {matchType === "unranked" &&
                      [
                        "TDM",
                        "Ultimate Arena",
                        "Royal Arena",
                        "Ruins",
                        "Domination",
                      ].map((map) => (
                        <option key={map} value={map.toLowerCase()}>
                          {map}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Player and Prize Details */}
            <Row>
              <Col md={3}>
                <Form.Group controlId="noOfPlayers" className="mb-3">
                  <Form.Label>No of Players</Form.Label>
                  <Form.Control
                    name="noOfPlayers"
                    type="number"
                    placeholder="Enter number of players"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="squadType" className="mb-3">
                  <Form.Label>Squad Type</Form.Label>
                  <Form.Select name="squadType" required>
                    <option value="">Select Squad Type</option>
                    {[1, 2, 3, 4].map((squad) => (
                      <option key={squad} value={squad}>
                        {squad}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="perKill" className="mb-3">
                  <Form.Label>Per Kill</Form.Label>
                  <Form.Control
                    name="perKill"
                    type="number"
                    placeholder="Enter per kill price"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="entryFee" className="mb-3">
                  <Form.Label>Entry Fee</Form.Label>
                  <Form.Control
                    name="entryFee"
                    type="number"
                    placeholder="Enter entry fee"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {[1, 2, 3].map((i) => (
                <Col md={4} key={i}>
                  <Form.Group controlId={`prizePool_${i}`} className="mb-3">
                    <Form.Label>Prize Pool {i}</Form.Label>
                    <Form.Control
                      name={`prizePool_${i}`}
                      type="number"
                      placeholder={`Enter prize pool ${i}`}
                      required
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="regCloseTime" className="mb-3">
                  <Form.Label>Registration Close Time</Form.Label>
                  <Form.Control
                    name="regCloseTime"
                    type="datetime-local"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="startTime" className="mb-3">
                  <Form.Label>Match Start Time</Form.Label>
                  <Form.Control
                    name="startTime"
                    type="datetime-local"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Submit Button with Spinner */}
            <Button
              variant="success"
              type="submit"
              className="mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Processing...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};
