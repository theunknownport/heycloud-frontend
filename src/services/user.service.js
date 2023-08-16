import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const listRegions = () => {
  return axios.get(API_URL + "admin/regions", { headers: authHeader() });
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
  getPublicContent,
  getUser,
  getModeratorBoard,
  listRegions,
  listRecentTasks,
  clearTasks,
  getPortalSession,
  changePassword,
  listVps,
  listNgrokTokens,
};
