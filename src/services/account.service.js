import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/accounts";

const getPortalSession = () => {
  return axios.get(API_URL + "/portal", { headers: authHeader() });
};

const changePassword = (oldpassword, password) => {
  return axios.post(API_URL + "/change-password", {
    oldpassword,
    password,
  },
  {
  headers: authHeader()
  })
  .then((response) => {

    return JSON.stringify(response.data);
  });
};

const getBalance = () => {
  return axios.get(API_URL + "/balance", { headers: authHeader() });
};

export default {
  getPortalSession,
  changePassword,
  getBalance,
};
