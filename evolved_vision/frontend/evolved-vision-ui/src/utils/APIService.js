import axios from "axios";
const API_URL = "http://localhost:8080/api/";

class APIService {
  postData(caller, operation, formData) {
    return axios.post(API_URL + caller + "/" + operation, formData);
  }

  getData(caller, params) {
    return axios.get(API_URL + caller + "/" + params);
  }
}

export default new APIService();
