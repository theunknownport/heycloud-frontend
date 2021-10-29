import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const listRecentTasks = () => {
  return axios.get(API_URL + "recent_tasks", { headers: authHeader() });
};

const listVps = () => {
  return axios.get(API_URL + "vms", { headers: authHeader() });
};

const clearTasks = () => {
  return axios.delete(API_URL + "recent_tasks", { headers: authHeader() });
};

const getCustomer = () => {
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
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  listRecentTasks,
  clearTasks,
  getCustomer,
  getPortalSession,
  changePassword,
  listVps,
};
