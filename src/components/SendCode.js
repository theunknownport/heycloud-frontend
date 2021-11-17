import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { parsePhoneNumber } from 'libphonenumber-js'
import { Redirect, Link } from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
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

  const [phone, setPhone] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneValidMessage, setPhoneValidMessage] = useState("initial")

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangePhone = value => {
    setPhone(value)
  };



  

  

  const handleSendCode = (e) => {
    e.preventDefault();
    setSuccessful(false);

    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0 && phoneValidMessage == "") {
      dispatch(sendCode(phone))
        .then(() => {
          setSuccessful(true);
          setLoading(false);
          props.history.push({
            pathname: '/reset-password',
            search:'phone=' + phone,
          });
        })
        .catch(() => {
          setSuccessful(true);
          setLoading(false);
          <Redirect to="/reset-password"/>
        })
    } else {
      setSuccessful(true)
      setLoading(false);
      props.history.push({
        pathname: '/reset-password',
        search:'phone=' + phone,
      });
    }
    
  };

  const validateNumber = (value) => {
    if(value === '' && phoneValidMessage != "initial"){
      return 'Please enter phone number'
    }
    try {
      const num = parsePhoneNumber(value)
      if (!num.isValid()) {
        setPhoneValidMessage('Invalid phone number.')
        return
      }
    } catch (e) {
      if (phoneValidMessage == "initial") {
        return true;
      }
      setPhoneValidMessage('This field is required')
      return
    }
    setPhoneValidMessage('');
    return true;
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
                                  <PhoneInput
                                    isValid={(value, country) => {
                                      return validateNumber(`+${value}`)
                                    }}
                                    enableSearch
                                    disableSearchIcon
                                    value={phone}
                                    onChange={onChangePhone}
                                    inputClass="form-control  form-control-user w-100"
                                    inputStyle={{paddingLeft: '18%', height: '20%', borderColor: "#d1d3e2"}}
                                    dropdownStyle={{textAlign: 'left', color: 'black'}}
                                    buttonStyle={{'border-radius': '10rem', color: 'unset !important', 'background-color': 'unset !important', padding: '2%'}}
                                    buttonClass="btn btn-link btn-sm   :hover{color: unset !important; background-color: unset !important;}"
                                    id="exampleInputPhone"
                                    placeholder="Phone"
                                  />
                                  {(() => {
                                    if (phoneValidMessage != "" && phoneValidMessage != "initial") {
                                      return (
                                        <div role="alert" style={{"marginTop":"5px","color":"red"}}>
                                        {phoneValidMessage}
                                      </div>
                                      )
                                    } else {
                                      return ""
                                    }
                                  })()}
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