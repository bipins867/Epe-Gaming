import { Tab, Nav, Table, Spinner } from "react-bootstrap";
import "./ShowEvents.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAlert } from "../../../../../../../../../UI/Alert/AlertContext";
import { getEventsListHandler } from "../../apiHandler";

export const ShowEventsPage = ({isInfoUpdated}) => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const { showAlert } = useAlert();

  const [events, setEvents] = useState({
    ongoing: [],
    upcoming: [],
    past: [],
    resultAwaited: [],
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getEventsListHandler(
        "1",
        setIsDataLoading,
        showAlert
      );

      if (response) {
        const data = {
          ongoing: response.data.ongoingEvents,
          upcoming: response.data.upcomingOrRescheduledEvents,
          past: response.data.canceledOrDeclaredEvents,
          resultAwaited: response.data.inReviewEvents,
        };
        setEvents(data);
      }
    };

    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInfoUpdated]);

  if (isDataLoading) {
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
      {/* Tabs Section */}
      <Tab.Container defaultActiveKey="ongoing">
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="ongoing">Ongoing Matches</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="resultAwaited">Result Awaited</Nav.Link>
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
                    <th>Match Start Date</th>
                    <th>Time</th>

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
                        <td>
                          {new Date(event.startTime).toLocaleDateString()}
                        </td>
                        <td>
                          {new Date(event.startTime).toLocaleTimeString()}
                        </td>
                        <td>{event.tittle}</td>
                        <td>{event.prizePool_1}</td>
                        <td>{event.squadType}</td>
                        <td>{event.version}</td>
                        <td>{event.map}</td>
                        <td>
                          <Link
                            to={`./${event.eventId}`}
                            className="btn btn-info"
                          >
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
    </>
  );
};
