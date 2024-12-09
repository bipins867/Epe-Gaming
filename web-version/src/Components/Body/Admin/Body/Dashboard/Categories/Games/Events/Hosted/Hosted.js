import React, { useEffect, useState } from "react";
import { Tab, Nav, Row, Col, Button, Form, Table } from "react-bootstrap";
import "./Hosted.css";
import { Link } from "react-router-dom";

export const HostedPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [matchType, setMatchType] = useState("");
  const [events, setEvents] = useState({
    ongoing: [],
    upcoming: [],
    past: [],
    resultAwaited: [],
  });

  useEffect(() => {
    setEvents({
      ongoing: [
        {
          matchStartTime: "2024-12-08 14:00",
          title: "Winter Clash",
          prizePool: 10000,
          squadType: "4",
          version: "1.5",
          map: "Erangel",
        },
      ],
      upcoming: [
        {
          matchStartTime: "2024-12-10 18:00",
          title: "Desert Showdown",
          prizePool: 15000,
          squadType: "2",
          version: "1.5",
          map: "Miramar",
        },
      ],
      past: [
        {
          matchStartTime: "2024-12-06 12:00",
          title: "Tropical Blitz",
          prizePool: 8000,
          squadType: "4",
          version: "1.5",
          map: "Sanhok",
        },
      ],
      resultAwaited: [
        {
          matchStartTime: "2024-12-06 12:00",
          title: "Tropical Blitz",
          prizePool: 8000,
          squadType: "4",
          version: "1.5",
          map: "Sanhok",
        },
      ],
    });
  }, []);

  const toggleForm = () => setShowForm((prev) => !prev);

  const handleMatchTypeChange = (e) => setMatchType(e.target.value);

  return (
    <div className="hosted-events-page">
      {/* Title and Create Event Button */}
      <Row className="mb-3">
        <Col>
          <h1 className="page-title">Hosted Events</h1>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={toggleForm}>
            {showForm ? "Cancel" : "Create Event"}
          </Button>
        </Col>
      </Row>

      {/* Create Event Form */}
      {showForm && (
        <div className="event-form-container mb-4">
          <h3>Create Event</h3>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="eventTitle" className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter event title" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="eventDescription" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Enter event description"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group controlId="eventType" className="mb-3">
                  <Form.Label>Event Type</Form.Label>
                  <Form.Control type="text" value="Hosted" disabled />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="matchType" className="mb-3">
                  <Form.Label>Match Type</Form.Label>
                  <Form.Select onChange={handleMatchTypeChange}>
                    <option value="">Select Match Type</option>
                    <option value="ranked">Ranked</option>
                    <option value="unranked">Unranked</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="map" className="mb-3">
                  <Form.Label>Map</Form.Label>
                  <Form.Select disabled={!matchType}>
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
                        "Sanotari",
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

            <Row>
              <Col md={3}>
                <Form.Group controlId="noOfPlayers" className="mb-3">
                  <Form.Label>No of Players</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter number of players"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="squadType" className="mb-3">
                  <Form.Label>Squad Type</Form.Label>
                  <Form.Select>
                    <option value="">Select Squad Type</option>
                    {[1, 2, 3, 4, 8].map((squad) => (
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
                    type="number"
                    placeholder="Enter per kill price"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="entryFee" className="mb-3">
                  <Form.Label>Entry Fee</Form.Label>
                  <Form.Control type="number" placeholder="Enter entry fee" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {[1, 2, 3].map((i) => (
                <Col md={4} key={i}>
                  <Form.Group controlId={`prizePool_${i}`} className="mb-3">
                    <Form.Label>Prize Pool {i}</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={`Enter prize pool ${i}`}
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="regCloseTime" className="mb-3">
                  <Form.Label>Registration Close Time</Form.Label>
                  <Form.Control type="datetime-local" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="matchStartTime" className="mb-3">
                  <Form.Label>Match Start Time</Form.Label>
                  <Form.Control type="datetime-local" />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="success" className="mt-3">
              Submit
            </Button>
          </Form>
        </div>
      )}

      {/* Tabs Section */}
      <Tab.Container defaultActiveKey="ongoing">
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="ongoing">Ongoing Matches</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="past">Result Awaited</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="upcoming">Upcoming Matches</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="past">Past Matches</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          {["ongoing", "resultAwaited", "upcoming", "past"].map((tab) => (
            <Tab.Pane eventKey={tab} key={tab}>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Match Start Time</th>
                    <th>Title</th>
                    <th>Prize Pool</th>
                    <th>Squad Type</th>
                    <th>Version</th>
                    <th>Map</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {events[tab].length > 0 ? (
                    events[tab].map((event, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{event.matchStartTime}</td>
                        <td>{event.title}</td>
                        <td>{event.prizePool}</td>
                        <td>{event.squadType}</td>
                        <td>{event.version}</td>
                        <td>{event.map}</td>
                        <td>
                          <Link to={`./${index}`} className="btn btn-info">
                            View More
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No events available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};
