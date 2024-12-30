import React, { useEffect, useState } from "react";
import "./TeamDetails.css";
import { useAlert } from "../../../../../../../../../UI/Alert/AlertContext";
import {
  declareEventResultHandler,
  getTeamAndMemberInfo,
} from "../../../apiHandler";
import {
  Card,
  Button,
  Form,
  Table,
  Accordion,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Importing icons for check and cross
import { updateTeamMemberInfoHandler } from "../../apiHandler";

export const TeamDetailsPage = ({
  eventId,
  eventInfo,
  isInfoUpdated,
  setIsInfoUpdated,
}) => {
  const [isTeamDataLoading, setIsTeamDataLoading] = useState(false);
  const { showAlert } = useAlert();

  const [teams, setTeams] = useState([]);
  const [isEditable, setIsEditable] = useState(false);

  // Handle kills update for team members
  const handleKillsChange = (teamIndex, memberIndex, value) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].teamMembers[memberIndex].kills =
      parseInt(value, 10) || 0;
    setTeams(updatedTeams);
  };

  // Handle rank input for a team
  const handleRankChange = (teamIndex, value) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].teamRank = value;
    setTeams(updatedTeams);
  };

  // Handle status change for a team or member
  const handleStatusChange = (teamIndex, memberIndex, status) => {
    const updatedTeams = [...teams];
    if (memberIndex !== undefined) {
      updatedTeams[teamIndex].teamMembers[memberIndex].status = status;
    } else {
      updatedTeams[teamIndex].status = status;
    }

    setTeams(updatedTeams);
  };

  // Handle remark change for a team or member
  const handleRemarkChange = (teamIndex, memberIndex, remark) => {
    const updatedTeams = [...teams];
    if (memberIndex !== undefined) {
      updatedTeams[teamIndex].teamMembers[memberIndex].remark = remark;
    } else {
      updatedTeams[teamIndex].remark = remark;
    }
    setTeams(updatedTeams);
  };

  // Save button logic for a team
  const handleSave = async (teamIndex) => {
    console.log("Saved team:", teams[teamIndex]);

    const response = await updateTeamMemberInfoHandler(
      teams[teamIndex],
      setIsTeamDataLoading,
      showAlert
    );

    if (response) {
      showAlert(
        "info",
        "Success!",
        `Saved Team Information :- ${teams[teamIndex].teamId}`
      );
    }
  };

  // Handle the declaration of result
  const handleDeclareResult = async () => {
    const response = await declareEventResultHandler(
      eventId,
      setIsTeamDataLoading,
      showAlert
    );

    if (response) {
      showAlert("info", "Success!", "Result Declayred ", null, () => {
        setIsInfoUpdated(isInfoUpdated + 1);
      });
    }
  };

  useEffect(() => {
    const fetchTeamDetails = async () => {
      const response = await getTeamAndMemberInfo(
        eventId,
        setIsTeamDataLoading,
        showAlert
      );

      if (response) {
        setTeams(response.teams);
      }
    };
    fetchTeamDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInfoUpdated]);

  if (isTeamDataLoading || eventInfo === null) {
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
      {/* Declare and Cancel Buttons */}
      {eventInfo.status === "inReview" && (
        <Card className="mb-4">
          <Card.Body>
            <h5>Team Status Update</h5>
            <Row>
              <Col>
                <Button
                  variant={!isEditable ? "success" : "danger"}
                  onClick={() => {
                    setIsEditable(!isEditable);
                  }}
                >
                  {!isEditable ? "Update" : "Cancel"} Team Details
                </Button>
              </Col>
              <Col>
                <div className="check-count">
                  <strong>Team Checked :- </strong> {teams.length}/
                  {teams.length}
                </div>
              </Col>
              <Col>
                <Button variant="primary" onClick={handleDeclareResult}>
                  Declare Result
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* Teams Accordion */}
      <Card className="mb-4">
        <Card.Body>
          <h5>Teams</h5>
          <Accordion alwaysOpen>
            {teams.map((team, teamIndex) => (
              <Accordion.Item eventKey={teamIndex.toString()} key={team.teamId}>
                <Accordion.Header>
                  Team #{team.teamNumber} - {team.teamId} -{" Checked :-"}
                  {team.isChecked ? <FaCheckCircle /> : <FaTimesCircle />}
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
                      <strong>Is Public:</strong> {team.isPublic ? "Yes" : "No"}{" "}
                      <br />
                      <strong>Joiners Paid:</strong>{" "}
                      {team.isJoinersPaid ? "Yes" : "No"} <br />
                      <strong>Amount Distributed:</strong>{" "}
                      {team.isAmountDistributed ? "Yes" : "No"} <br />
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
                      <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          as="select"
                          value={team.status}
                          onChange={(e) =>
                            handleStatusChange(
                              teamIndex,
                              undefined,
                              e.target.value
                            )
                          }
                        >
                          <option value="select">Select Status:-</option>
                          <option value="Joined">Joined</option>
                          <option value="Not Joined">Not Joined</option>
                          <option value="Disqualified">Disqualified</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Remark</Form.Label>
                        <Form.Control
                          as="textarea"
                          value={team.remark}
                          onChange={(e) =>
                            handleRemarkChange(
                              teamIndex,
                              undefined,
                              e.target.value
                            )
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
                            <th>Status</th>
                            <th>Remark</th>
                            <th>Winning Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {team.teamMembers.map((member, memberIndex) => (
                            <tr key={memberIndex}>
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
                              <td>
                                <Form.Control
                                  as="select"
                                  value={member.status}
                                  onChange={(e) =>
                                    handleStatusChange(
                                      teamIndex,
                                      memberIndex,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="select">
                                    Select Status :-
                                  </option>
                                  <option value="Joined">Joined</option>
                                  <option value="Not Joined">Not Joined</option>
                                  <option value="Disqualified">
                                    Disqualified
                                  </option>
                                </Form.Control>
                              </td>
                              <td>
                                <Form.Control
                                  as="textarea"
                                  value={member.remark}
                                  onChange={(e) =>
                                    handleRemarkChange(
                                      teamIndex,
                                      memberIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td>₹{member.winningBalance}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>Team Rank :</strong> {team.teamRank} <br />
                        <strong>Is Public:</strong>{" "}
                        {team.isPublic ? "Yes" : "No"} <br />
                        <strong>Joiners Paid:</strong>{" "}
                        {team.isJoinersPaid ? "Yes" : "No"} <br />
                        <strong>Amount Distributed:</strong>{" "}
                        {team.isAmountDistributed ? "Yes" : "No"} <br />
                        <strong>Status:</strong> {team.status} <br />
                        <strong>Remark:</strong> {team.remark}
                      </p>
                      <h6>Team Members</h6>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Player Name</th>
                            <th>Player ID</th>
                            <th>Kills</th>
                            <th>Status</th>
                            <th>Remark</th>
                            <th>Winning Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {team.teamMembers.map((member, memberIndex) => (
                            <tr key={memberIndex}>
                              <td>{memberIndex + 1}</td>
                              <td>{member.playerName}</td>
                              <td>{member.playerId}</td>
                              <td>{member.kills}</td>
                              <td>{member.status}</td>
                              <td>{member.remark}</td>
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
    </>
  );
};
