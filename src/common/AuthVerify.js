import React from "react";
import { isExpired, decodeToken } from "react-jwt";
import moment from 'moment';


const AuthVerify = (props) => {
  const user = JSON.parse(localStorage.getItem("user")) ;
  if (user) {
    const decodedToken = (decodeToken(user.access_token))
    var now = new Date();
    var tokenExpire = new Date(decodedToken.exp);
    console.log(moment(tokenExpire).format('MMMM Do YYYY, h:mm:ss a'))
    if (tokenExpire < now) {
      props.logOut();
    }
  }

  return <div></div>;
};

export default AuthVerify;