import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import EarlyFooter from "../components/EarlyFooter";
import logo from './../assets/img/logos/logo-white-small.png'
import illustration from './../assets/img/illustrations/server1.png'

import { login } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div role="alert" style={{"marginTop":"5px","color":"red"}}>
        This field is required!
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 8 || value.length > 40) {
    return (
      <div role="alert" style={{"marginTop":"5px","color":"red"}}>
        The password must be between 8 and 40 characters.
      </div>
    );
  }
};

const Login = (props) => {

 
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password))
        .then(() => {
          props.history.push("/dashboard?preloader=true");
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/dashboard?preloader=true" />;
  }

  return (
    <div className="bg-gradient-primary" style={{'margin': '0','height': '100%','width': '100%','min-height': '100%'}}>
      <div className="container">
          <div className="row justify-content-center">
              <div className="col-md-9 col-lg-12 col-xl-10">
                  <div className="card shadow-lg o-hidden border-0 my-5">
                      <div className="card-body p-0">
                          <div className="row">
                              <div className="col-lg-6 col-xl-6 d-none d-lg-flex">
                                  <div className="flex-grow-1 bg-login-image" style={{'backgroundSize': 'contain','backgroundImage': `url(${illustration})`, 'background-repeat': 'no-repeat'}}></div>
                              </div>
                              <div className="col-lg-6 col-xl-6">
                                  <div className="p-5">
                                      <div className="text-center">
                                          <h4 className="text-dark mb-4">Welcome back!</h4>
                                      </div>
                                      <Form className="user" onSubmit={handleLogin} ref={form} style={{margin: '18px'}}>
                                          <div className="mb-3">
                                              <Input
                                              id="exampleInputEmail"
                                              type="email"
                                              className="form-control  form-control-user"
                                              placeholder="Email"
                                              name="email"
                                              value={email}
                                              onChange={onChangeEmail}
                                              validations={[required]}
                                              />
                                          </div>
                                          <div className="mb-3">
                                              <Input
                                              id="exampleInputPassword"
                                              type="password"
                                              className="form-control form-control-user"
                                              name="password"
                                              placeholder="Password"
                                              value={password}
                                              onChange={onChangePassword}
                                              validations={[vpassword, required]}
                                              />
                                          </div>
                                          <div className="mb-3">
                                          </div><button className="btn btn-primary d-block btn-user w-100" type="submit" disabled={loading}>Login
                                          {loading && (
                                              <span className="spinner-border spinner-border-sm"></span>
                                          )}
                                          </button>
                                          <hr></hr>
                                          {message && (
                                          <div className="form-group">
                                                <div className="alert alert-danger" role="alert">
                                                    {message}
                                                </div>
                                          </div>
                                      )}
                                      <CheckButton style={{ display: "none" }} ref={checkBtn} />
                                      </Form>
                                      <div className="text-center"><Link to="/forgot-password" className="small">Forgot Password?</Link></div>
                                      <div className="text-center"><Link to="/verify" className="small">Looking to verify your phone number?</Link></div>
                                      <div className="text-center d-xl-flex justify-content-xl-center"><Link to="/register" className="small">Don't have an Account yet? Create one for free!</Link></div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <EarlyFooter />
      <script src="assets/bootstrap/js/bootstrap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/6.4.8/swiper-bundle.min.js"></script>
    </div>    
  );
};

export default Login;
