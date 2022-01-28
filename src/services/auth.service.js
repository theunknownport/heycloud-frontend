import axios from "axios";

const API_URL = "http://192.168.1.16:8000/users";

const register = (name, prename, email, password, phone) => {
  phone = "+" + phone
  return axios.post(API_URL, {
    name,
    prename,
    email,
    password,
    phone,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return JSON.stringify(response.data);
    });
};

const verify = (phone, code) => {
  phone = "+" + phone
  return axios
    .post(API_URL + "/verify", {
      phone,
      code,
    })
    .then((response) => {

      return JSON.stringify(response.data);
    });
};

const sendCode = (phone) => {
  phone = "+" + phone
  return axios
    .post(API_URL + "/forgot-password/send", {
      phone,
    })
    .then((response) => {

      return JSON.stringify(response.data);
    });
};

const resetPassword = (phone, code, password) => {
  phone = "+" + phone
  return axios.post(API_URL + "/forgot-password", {
    code,
    password,
    phone,
  })
  .then((response) => {

    return JSON.stringify(response.data);
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
  verify,
  sendCode,
  resetPassword,
};
