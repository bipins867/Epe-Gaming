import {
  apiRequest,
  handleErrors,
} from "../../../../../../../../Utils/apiHandler";

export const createEventHandler = async (
  eventInfo,
  setIsLoading,
  showAlert
) => {
  //above authentication will be here --
  const obj = eventInfo;
  const url = "/admin/events/createEvents";

  setIsLoading(true);

  try {
    const token = localStorage.getItem("adminToken");
    const result = await apiRequest(url, obj, token, "post");
    const data = result.data;

    return data;
  } catch (e) {
    handleErrors(e, showAlert);
  } finally {
    setIsLoading(false);
  }
};


export const getEventsListHandler = async (GameId, setIsLoading, showAlert) => {
  //above authentication will be here --
  const obj = {
    GameId: GameId,
  };
  const url = "/admin/events/getEventsList";

  setIsLoading(true);

  try {
    const token = localStorage.getItem("adminToken");
    const result = await apiRequest(url, obj, token, "post");
    const data = result.data;

    return data;
  } catch (e) {
    handleErrors(e, showAlert);
  } finally {
    setIsLoading(false);
  }
};

export const getEventInfoHandler = async (eventId, setIsLoading, showAlert) => {
  //above authentication will be here --
  const obj = {
    eventId,
  };
  const url = "/admin/events/getEventInfo";

  setIsLoading(true);

  try {
    const token = localStorage.getItem("adminToken");
    const result = await apiRequest(url, obj, token, "post");
    const data = result.data;

    return data;
  } catch (e) {
    handleErrors(e, showAlert);
  } finally {
    setIsLoading(false);
  }
};

export const getTeamAndMemberInfoHandler = async (
  eventId,
  setIsLoading,
  showAlert
) => {
  //above authentication will be here --
  const obj = {
    eventId,
  };
  const url = "/admin/events/getTeamAndMemberInfo";

  setIsLoading(true);

  try {
    const token = localStorage.getItem("adminToken");
    const result = await apiRequest(url, obj, token, "post");
    const data = result.data;

    return data;
  } catch (e) {
    handleErrors(e, showAlert);
  } finally {
    setIsLoading(false);
  }
};

export const updateEventRoomCredentialsHandler = async (
  eventId,
  roomId,
  roomPassword,
  setIsLoading,
  showAlert
) => {
  //above authentication will be here --
  const obj = {
    eventId,
    roomId,
    roomPassword,
  };
  const url = "/admin/events/updateRoomCredentials";

  setIsLoading(true);

  try {
    const token = localStorage.getItem("adminToken");
    const result = await apiRequest(url, obj, token, "post");
    const data = result.data;

    return data;
  } catch (e) {
    handleErrors(e, showAlert);
  } finally {
    setIsLoading(false);
  }
};

export const updateEventStatusHandler = async (
  eventId,
  status,
  rescheduledTime,
  remark,
  setIsLoading,
  showAlert
) => {
  //above authentication will be here --
  const obj = {
    eventId,
    status,
    rescheduledTime,
    remark,
  };
  const url = "/admin/events/updateEventStatus";

  setIsLoading(true);

  try {
    const token = localStorage.getItem("adminToken");
    const result = await apiRequest(url, obj, token, "post");
    const data = result.data;

    return data;
  } catch (e) {
    handleErrors(e, showAlert);
  } finally {
    setIsLoading(false);
  }
};


export const updateTeamMemberInfoHandler = async (
  teamInfo,
  setIsLoading,
  showAlert
) => {
  //above authentication will be here --
  const obj = {
    teamInfo
  };
  const url = "/admin/events/updateTeamAndMemberInfo";

  setIsLoading(true);

  try {
    const token = localStorage.getItem("adminToken");
    const result = await apiRequest(url, obj, token, "post");
    const data = result.data;

    return data;
  } catch (e) {
    handleErrors(e, showAlert);
  } finally {
    setIsLoading(false);
  }
};

export const declayerResultHandler = async (
  eventId,
  setIsLoading,
  showAlert
) => {
  //above authentication will be here --
  const obj = {
    eventId
  };
  const url = "/admin/events/declareEventResult";

  setIsLoading(true);

  try {
    const token = localStorage.getItem("adminToken");
    const result = await apiRequest(url, obj, token, "post");
    const data = result.data;

    return data;
  } catch (e) {
    handleErrors(e, showAlert);
  } finally {
    setIsLoading(false);
  }
};
