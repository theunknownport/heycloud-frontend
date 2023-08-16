import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/vps/";


const getVpsCost = () => {
  return axios.get(API_URL + "/cost", { headers: authHeader() });
};


const listRegionsUser = () => {
  return axios.get(API_URL + "regions", { headers: authHeader() });
};

const listRecentTasks = () => {
  return axios.get(API_URL + "recent-tasks", { headers: authHeader() });
};

const listVps = () => {
  return axios.get(API_URL + "vps", { headers: authHeader() });
};

const listNgrokTokens = () => {
  return axios.get(API_URL + "ngrok-tokens", { headers: authHeader() });
};

const clearTasks = () => {
  return axios.delete(API_URL + "recent-tasks", { headers: authHeader() });
};

const getUser = () => {
  return axios.get(API_URL + "users", { headers: authHeader() });
};

const getPortalSession = () => {
  return axios.get(API_URL + "accounts/portal", { headers: authHeader() });
};

const changePassword = (oldpassword, password) => {
  return axios.post(API_URL + "accounts/change-password", {
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

export default {
    getVpsCost,
    listRegionsUser
};
