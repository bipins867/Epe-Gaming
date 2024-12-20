import {
  apiRequest,
  handleErrors,
} from "../../../../../../../Utils/apiHandler";

export const getEventsCountHandler = async (GameId, setIsLoading, showAlert) => {
  //above authentication will be here --
  const obj = {
    gameId:GameId,
  };
  const url = "/admin/events/getEventsCount";

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

export const getEventsHandler = async (GameId, setIsLoading, showAlert) => {
  //above authentication will be here --
  const obj = {
    GameId,
  };
  const url = "/admin/events/getEvents";

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

export const createEventsHandler = async (
  formData,
  setIsLoading,
  showAlert
) => {
  //above authentication will be here --
  const obj = formData;
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

export const updateRoomCredentialsHandler = async (
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

export const getTeamAndMemberInfo = async (
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

export const updateEventStatusHandler = async (
  eventId,
  status,
  remark,
  rescheduledTime,
  setIsLoading,
  showAlert
) => {
  //above authentication will be here --
  const obj = {
    eventId,
    status,
    remark,
    rescheduledTime,
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

export const updateTeamsAndMemberInfoHandler = async (
  teamInfo,
  membersInfo,
  setIsLoading,
  showAlert
) => {
  //above authentication will be here --
  const obj = {
    teamInfo,
    membersInfo,
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

export const declareEventResultHandler = async (
  eventId,
  setIsLoading,
  showAlert
) => {
  //above authentication will be here --
  const obj = {
    eventId,
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
