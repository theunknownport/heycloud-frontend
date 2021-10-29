import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Redirect, Link } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";



import { sendCode } from "../actions/auth";

import illustration from './../assets/img/illustrations/cluster1.png'

const required = (value) => {
  if (!value) {
    return (
      <div role="alert" style={{"marginTop":"5px","color":"red"}}>
        This field is required!
      </div>
    );
  }
};


const SendCode = (props) => {
  const form = useRef();
  const checkBtn = useRef();

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



  

  

  const handleSendCode = (e) => {
    e.preventDefault();
    setSuccessful(false);

    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(sendCode(phone))
        .then(() => {
          setSuccessful(true);
          setLoading(false);
          global.window && (global.window.location.href = '/reset-password');
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
                              <h4 class="text-dark mb-2">Forgot Your Password?</h4>
                                        <p class="mb-4">We get it, stuff happens. Just enter your phone number below and we'll send you a code to start resetting your password!</p>
                              </div>
                              <Form className="user" onSubmit={handleSendCode} ref={form} style={{margin: '18px'}}>
                                  <div className="mb-3">
                                    <Input
                                    id="exampleInputPhone"
                                    type="phone"
                                    className="form-control  form-control-user"
                                    placeholder="Phone"
                                    name="phone"
                                    value={phone}
                                    onChange={onChangePhone}
                                    validations={[required]}
                                    />
                                  </div>
                                    
                                  
                                  <button className="btn btn-primary d-block btn-user w-100" type="submit" disabled={loading}>Send code</button>
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

export default SendCode;