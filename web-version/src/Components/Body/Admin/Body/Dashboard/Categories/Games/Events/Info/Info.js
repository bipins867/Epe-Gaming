import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Accordion,
} from "react-bootstrap";
import "./Info.css";

export const InfoPage = () => {
  // Dummy Data
  const eventInfo = {
    title: "Elite Battle Royale",
    description: "The ultimate showdown in the virtual battlegrounds.",
    eventType: "Hosted",
    matchType: "Ranked",
    map: "Erangel",
    noOfPlayers: 100,
    squadType: 4,
    perKill: 50.0,
    entryFee: 100.0,
    prizePool1: 5000.0,
    prizePool2: 3000.0,
    prizePool3: 1000.0,
    regCloseTime: "2024-12-20 18:00:00",
    matchStartTime: "2024-12-20 20:00:00",
    eventCreationTime: "2024-12-07 10:00:00",
    status: "Ongoing",
    isPublic: true,
    version: "TPP",
    isRunning: true,
  };

  const initialTeams = [
    {
      teamId: "T001",
      teamNumber: 1,
      isPublic: true,
      isJoinersPaid: true,
      isAmountDistributed: false,
      teamRank: "",
      members: [
        { playerName: "John", playerId: "P001", kills: 5, winningBalance: 500 },
        {
          playerName: "Alice",
          playerId: "P002",
          kills: 2,
          winningBalance: 200,
        },
        {
          playerName: "Steve",
          playerId: "P003",
          kills: 1,
          winningBalance: 100,
        },
        { playerName: "Nina", playerId: "P004", kills: 0, winningBalance: 0 },
      ],
    },
    {
      teamId: "T002",
      teamNumber: 2,
      isPublic: false,
      isJoinersPaid: false,
      isAmountDistributed: false,
      teamRank: "",
      members: [
        { playerName: "Tom", playerId: "P005", kills: 3, winningBalance: 300 },
        { playerName: "Jerry", playerId: "P006", kills: 0, winningBalance: 0 },
        { playerName: "Anna", playerId: "P007", kills: 4, winningBalance: 400 },
        { playerName: "Sam", playerId: "P008", kills: 2, winningBalance: 200 },
      ],
    },
  ];

  const [teams, setTeams] = useState(initialTeams);
  const [isEditable, setIsEditable] = useState(false);

  // Handle kills update for team members
  const handleKillsChange = (teamIndex, memberIndex, value) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].members[memberIndex].kills =
      parseInt(value, 10) || 0;
    setTeams(updatedTeams);
  };

  // Handle rank input for a team
  const handleRankChange = (teamIndex, value) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].teamRank = value;
    setTeams(updatedTeams);
  };

  // Save button logic for a team
  const handleSave = (teamIndex) => {
    console.log("Saved team:", teams[teamIndex]);
    alert(`Team ${teams[teamIndex].teamNumber} saved successfully.`);
  };

  return (
    <div className="info-page">
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
                  <strong>Title:</strong> {eventInfo.title}
                </li>
                <li>
                  <strong>Description:</strong> {eventInfo.description}
                </li>
                <li>
                  <strong>Event Type:</strong> {eventInfo.eventType}
                </li>
                <li>
                  <strong>Match Type:</strong> {eventInfo.matchType}
                </li>
              </ul>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Room ID and Password Form */}
      <Card className="mb-4">
        <Card.Body>
          <h5>Set Room Details</h5>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="roomId">
                  <Form.Label>Room ID</Form.Label>
                  <Form.Control type="text" placeholder="Enter Room ID" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="roomPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter Password" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Button variant="primary" className="me-3">
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Declare and Cancel Buttons */}
      <div className="text-center mb-4">
        {!isEditable ? (
          <Button variant="success" onClick={() => setIsEditable(true)}>
            Declare Result
          </Button>
        ) : (
          <Button variant="danger" onClick={() => setIsEditable(false)}>
            Cancel
          </Button>
        )}
      </div>

      {/* Teams Accordion */}
      <Card className="mb-4">
        <Card.Body>
          <h5>Teams</h5>
          <Accordion alwaysOpen>
            {teams.map((team, teamIndex) => (
              <Accordion.Item eventKey={teamIndex.toString()} key={team.teamId}>
                <Accordion.Header>
                  Team #{team.teamNumber} - {team.teamId}
                  {isEditable && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="ms-auto"
                      onClick={() => handleSave(teamIndex)}
                    >
                      Save
                    </Button>
                  )}
                </Accordion.Header>
                <Accordion.Body>
                  {isEditable ? (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label>Team Rank</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Team Rank"
                          value={team.teamRank}
                          onChange={(e) =>
                            handleRankChange(teamIndex, e.target.value)
                          }
                        />
                      </Form.Group>
                      <h6>Update Kills</h6>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Player Name</th>
                            <th>Player ID</th>
                            <th>Kills</th>
                          </tr>
                        </thead>
                        <tbody>
                          {team.members.map((member, memberIndex) => (
                            <tr key={member.playerId}>
                              <td>{memberIndex + 1}</td>
                              <td>{member.playerName}</td>
                              <td>{member.playerId}</td>
                              <td>
                                <Form.Control
                                  type="number"
                                  value={member.kills}
                                  onChange={(e) =>
                                    handleKillsChange(
                                      teamIndex,
                                      memberIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>Is Public:</strong>{" "}
                        {team.isPublic ? "Yes" : "No"} <br />
                        <strong>Joiners Paid:</strong>{" "}
                        {team.isJoinersPaid ? "Yes" : "No"} <br />
                        <strong>Amount Distributed:</strong>{" "}
                        {team.isAmountDistributed ? "Yes" : "No"}
                      </p>
                      <h6>Team Members</h6>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Player Name</th>
                            <th>Player ID</th>
                            <th>Kills</th>
                            <th>Winning Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {team.members.map((member, memberIndex) => (
                            <tr key={member.playerId}>
                              <td>{memberIndex + 1}</td>
                              <td>{member.playerName}</td>
                              <td>{member.playerId}</td>
                              <td>{member.kills}</td>
                              <td>₹{member.winningBalance}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>
      </Card>
    </div>
  );
};
