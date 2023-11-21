import axios from "axios";
const API_URL = "http://localhost:8080/api/member";

class APIService {
  postData(operation, formData) {
    return axios.post(API_URL + "/" + operation, formData);
  }
}

export default new APIService();
