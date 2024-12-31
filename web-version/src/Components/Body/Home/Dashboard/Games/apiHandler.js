import { apiRequest, handleErrors } from "../../../../../Utils/apiHandler";

export const fetchGameDashboardInfoHandler = async (setIsLoading, showAlert) => {
  //above authentication will be here --
  const obj = {};
  const url = "/web/info/dasbhoardInfo";

  setIsLoading(true);

  try {
    
    const result = await apiRequest(url, obj, "", "get");
    const data = result.data;

    return data;
  } catch (e) {
    handleErrors(e, showAlert);
  } finally {
    setIsLoading(false);
  }
};


