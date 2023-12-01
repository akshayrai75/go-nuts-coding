import APIService from "./APIService";
import { getFormData } from "./helper";

export const getS3Link = async (file, userId) => {
  try {
    const resp = await APIService.postData(
      "member",
      "admin/upload",
      getFormData({
        file,
        userId: userId,
      })
    );
    return resp.data.url;
  } catch (e) {
    console.log("e", e);
  }
};
