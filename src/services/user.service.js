import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://192.168.1.16:8000/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const listRegions = () => {
  return axios.get(API_URL + "admin/region", { headers: authHeader() });
};

const listRecentTasks = () => {
  return axios.get(API_URL + "recent_tasks", { headers: authHeader() });
};

const listVps = () => {
  return axios.get(API_URL + "vps", { headers: authHeader() });
};

const listNgrokTokens = () => {
  return axios.get(API_URL + "ngrok_tokens", { headers: authHeader() });
};

const clearTasks = () => {
  return axios.delete(API_URL + "recent_tasks", { headers: authHeader() });
};

const getUser = () => {
  return axios.get(API_URL + "users", { headers: authHeader() });
};

const getPortalSession = () => {
  return axios.get(API_URL + "account/portal", { headers: authHeader() });
};

const changePassword = (oldpassword, password) => {
  return axios.post(API_URL + "account/change-password", {
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
