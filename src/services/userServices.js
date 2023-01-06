import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
const getAllUser = (inputId) => {
  return axios.get(`/api/getAllUser?id=${inputId}`); //sử dụng template string 
};

export { handleLoginApi, getAllUser };
