import React, { useEffect, useState } from "react";
import "./TeamDetails.css";
import { useAlert } from "../../../../../../../../../UI/Alert/AlertContext";
import { getTeamAndMemberInfo } from "../../../apiHandler";
import { Card, Button, Form, Table, Accordion, Spinner } from "react-bootstrap";

export const TeamDetailsPage = ({ eventId,eventInfo, }) => {
  const [isTeamDataLoading, setIsTeamDataLoading] = useState(false);
  const { showAlert } = useAlert();

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

  useEffect(() => {
    const fetchTeamDetails = async () => {
      const response = await getTeamAndMemberInfo(
        eventId,
        setIsTeamDataLoading,
        showAlert
      );

      if (response) {
        console.log(response.teams);
      }
    };
    fetchTeamDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTeamDataLoading || eventInfo===null) {
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
      <Card className="mb-4">
        <Card.Body>
          <h5>Team Status Update</h5>
          <div className="text-center mb-4">
            {!isEditable ? (
              <Button variant="success" onClick={() => setIsEditable(true)}>
                Update Team Details
              </Button>
            ) : (
              <Button variant="danger" onClick={() => setIsEditable(false)}>
                Cancel Update
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

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
    </>
  );
};
