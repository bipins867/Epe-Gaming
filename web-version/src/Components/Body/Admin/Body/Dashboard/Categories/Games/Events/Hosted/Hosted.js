import React, { useState } from "react";
import "./Hosted.css";

import { CreateEventPage } from "./CreateEvent/CreateEvent";
import { ShowEventsPage } from "./ShowEvents/ShowEvents";

export const HostedPage = () => {
  
  const [isInfoUpdated,setIsInfoUpdated]=useState(0);


  return (
    <div className="hosted-events-page">

      {/* Create Event Form */}
      <CreateEventPage  setIsInfoUpdated={setIsInfoUpdated}/>

      <ShowEventsPage isInfoUpdated={isInfoUpdated} />
    </div>
  );
};
