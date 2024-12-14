import { apiRequest, handleErrors } from "../../../../../../Utils/apiHandler";

export const fetchAnnouncementHandler = async (setIsLoading, showAlert) => {
  //above authentication will be here --
  const obj = {};
  const url = "/admin/announcement/get";

  setIsLoading(true);

  try {
    const token = localStorage.getItem("adminToken");
    const result = await apiRequest(url, obj, token, "get");
    const data = result.data;

    return data;
  } catch (e) {
    handleErrors(e, showAlert);
  } finally {
    setIsLoading(false);
  }
};

export const createAnnouncementHandler = async (
  message,
  type,
  setIsLoading,
  showAlert
) => {
  //above authentication will be here --
  const obj = { message, type };
  const url = "/admin/announcement/create";

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

export const updateAnnouncementHandler = async (
  id,
  isActive,
  setIsLoading,
  showAlert
) => {
  //above authentication will be here --
  const obj = { id, isActive };
  const url = "/admin/announcement/update";

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

export const deleteAnnouncementHandler = async (
  id,
  setIsLoading,
  showAlert
) => {
  //above authentication will be here --
  const obj = { id };
  const url = "/admin/announcement/delete";

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
