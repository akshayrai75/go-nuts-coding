import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class APIService {
    postData(operation, formData) {
        return axios.post(API_URL + "/" + operation, formData);
    }
}

export default new APIService