import React, { useState } from "react";
import "./Info.css";
import { useParams } from "react-router-dom";
import { EventDetailsPage } from "./EventDetails/EventDetails";
import { TeamDetailsPage } from "./TeamDetails/TeamDetails";

export const InfoPage = () => {
  const { eventId } = useParams();
  const [isInfoUpdated, setIsInfoUpdated] = useState(0);
  const [eventInfo, setEventInfo] = useState(null);

  return (
    <div className="info-page">
      <EventDetailsPage
        eventId={eventId}
        eventInfo={eventInfo}
        setEventInfo={setEventInfo}
        isInfoUpdated={isInfoUpdated}
        setIsInfoUpdated={setIsInfoUpdated}
      />

      <TeamDetailsPage
        eventId={eventId}
        eventInfo={eventInfo}
        isInfoUpdated={isInfoUpdated}
        setIsInfoUpdated={setIsInfoUpdated}
      />
    </div>
  );
};
