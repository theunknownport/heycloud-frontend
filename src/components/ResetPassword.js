import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Redirect, Link } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";



import { resetPassword } from "../actions/auth";

import illustration from './../assets/img/illustrations/cluster2.png'

const required = (value) => {
  if (!value) {
    return (
      <div role="alert" style={{"marginTop":"5px","color":"red"}}>
        This field is required!
      </div>
    );
  }
};

let passwordcheck = ""
const matchcreatepassword = (value) => {
  if (value != passwordcheck) {
    passwordcheck = value
    return (
      <div role="alert" style={{"marginTop":"5px","color":"red"}}>
        
      </div>
    );
  }
};


const matchpassword = (value) =>{
  if (value.toString() !== passwordcheck) {
    return (
      <div role="alert" style={{"marginTop":"5px","color":"red"}}>
        Passwords dont match!
      </div> 
    );
  }
};

const vpassword = (value) => {
  if (value.length < 8 || value.length > 40) {
    passwordcheck = value
    return (
      <div role="alert" style={{"marginTop":"5px","color":"red"}}>
        The password must be between 8 and 40 characters. 
      </div>
    );
  }
};

const ResetPassword = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const onChangeCode = (e) => {
    const code = e.target.value;
    setCode(code);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangePassword2 = (e) => {
    const password2 = e.target.value;
    setPassword2(password2);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setSuccessful(false);

    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(resetPassword(phone))
        .then(() => {
          setSuccessful(true);
          global.window && (global.window.location.href = '/dashboard');
        })
        .catch(() => {
          setSuccessful(false);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    
  };


  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }
  
  return (
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10">
          <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
                  <div className="row">
                      <div className="col-lg-5 col-xl-6 d-none d-lg-flex">
                          <div className="flex-grow-1 align-items-center bg-register-image" style={{'background-size': 'contain','background-image': `url(${illustration})`, 'background-repeat': 'no-repeat'}}></div>
                      </div>
                      <div className="col-lg-7 col-xl-6 offset-xl-0">
                          <div className="align-items-center align-content-center p-5">
                              <div className="text-center">
                              <h4 class="text-dark mb-2">Reset password</h4>
                                        <p class="mb-4">Enter your new password, along with the code you recieved per sms.</p>
                              </div>
                              <Form className="user" onSubmit={handleResetPassword} ref={form} style={{margin: '18px'}}>
                                    <div className="mb-3">
                                      <Input
                                      id="exampleInputPhone"
                                      type="phone"
                                      className="form-control  form-control-user"
                                      placeholder="Phone"
                                      name="phone"
                                      value={phone}
                                      onChange={onChangePhone}
                                      validations={[required,]}
                                      />
                                  </div>
                                  <div className="mb-3">
                                    <Input
                                    id="exampleInputCode"
                                    type="phone"
                                    className="form-control  form-control-user"
                                    placeholder="Code"
                                    name="code"
                                    value={code}
                                    onChange={onChangeCode}
                                    validations={[required,]}
                                    />
                                  </div>
                                    
                                  <div className="row mb-3">
                                      <div className="col-sm-6 mb-3 mb-sm-0">
                                        <Input
                                          id="exampleInputPassword"
                                          type="password"
                                          className="form-control form-control-user"
                                          name="password"
                                          placeholder="Password"
                                          value={password}
                                          onChange={onChangePassword}
                                          validations={[required, vpassword, matchcreatepassword]}
                                          />
                                      </div>
                                      <div className="col-sm-6">
                                        <Input
                                        id="exampleInputPassword"
                                        type="password"
                                        className="form-control form-control-user"
                                        name="password"
                                        value={password2}
                                        placeholder="Repeat password"
                                        onChange={onChangePassword2}
                                        validations={[required, vpassword, matchpassword]}
                                        />
                                      </div>
                                  </div>
                                    
                                  
                                  <button className="btn btn-primary d-block btn-user w-100" type="submit" disabled={loading}>Reset password</button>
                                  {loading && (
                                    <span className="spinner-border spinner-border-sm" style={{'margin':'auto'}}></span>
                                  )}
                                  <hr></hr>
                                  {message && (
                                    <div className="form-group">
                                      <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                        {message}
                                      </div>
                                    </div>
                                  )}
                                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                                </Form>
                                <div className="text-center d-xl-flex justify-content-xl-center"><Link to="/login" className="small">Already have an account? Login!</Link></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        </div>

  );
};

export default ResetPassword;