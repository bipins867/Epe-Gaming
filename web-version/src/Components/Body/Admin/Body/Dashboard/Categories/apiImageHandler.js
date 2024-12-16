import {
  apiRequest,
  apiUploadRequest,
  handleErrors,
} from "../../../../../../Utils/apiHandler";

export const fetchImagesHandler = async (
  type,
  isActive,
  gameId,
  setIsLoading,
  showAlert
) => {
  //above authentication will be here --
  const obj = {
    type,
    isActive,
    gameId,
  };
  const url = "/admin/imageSlider/getImages";

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
export const addImagesHandler = async (obj, setIsLoading, showAlert) => {
  const url = "/admin/imageSlider/addImage";

  setIsLoading(true);

  try {
    const token = localStorage.getItem("adminToken");
    const result = await apiUploadRequest(url, obj, token);
    const data = result.data;

    return data;
  } catch (e) {
    handleErrors(e, showAlert);
  } finally {
    setIsLoading(false);
  }
};

export const updateImageStatusHandler = async (
  imageId,
  isActive,
  setIsLoading,
  showAlert
) => {
  //above authentication will be here --
  const obj = {
    imageId,
    isActive,
  };
  const url = "/admin/imageSlider/updateImageStatus";

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

export const deleteImageHandler = async (imageId, setIsLoading, showAlert) => {
  //above authentication will be here --
  const obj = {
    imageId,
  };
  const url = "/admin/imageSlider/deleteImage";

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
