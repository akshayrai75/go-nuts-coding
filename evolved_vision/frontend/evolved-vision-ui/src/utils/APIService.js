import axios from "axios";
const API_URL = "http://localhost:8080/api/";
export const TARGET_IMAGE_URL = "http://44.219.170.153:3001/generate-zpt";
class APIService {
  postData(caller, operation, formData) {
    return axios.post(API_URL + caller + "/" + operation, formData);
  }

  getData(caller, params) {
    return axios.get(API_URL + caller + "/" + params);
  }
}

export default new APIService();
