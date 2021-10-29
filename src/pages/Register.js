import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";


import { Link, Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../actions/auth";
import { setMessage } from "../actions/message";

import logo from './../assets/img/logos/logo-white-small.png'
import illustration from './../assets/img/illustrations/cloud1.png'

const required = (value) => {
  if (!value) {
    return (
      <div role="alert" style={{"marginTop":"5px","color":"red"}}>
        This field is required!
      </div>
    );
  }
};



const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div role="alert" style={{"marginTop":"5px","color":"red"}}>
        This is not a valid email.
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

const vphone = (value) =>{
  const regEx = /^\+[1-9]\d{10,14}$/;
  if (regEx.test(value) == false) {
    return (
      <div role="alert" style={{"marginTop":"5px","color":"red"}}>
        Invalid phone number. Use format: +41791111213
      </div> 
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState("");
  const [prename, setPrename] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const stateRef = useRef();

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangePrename = (e) => {
    const prename = e.target.value;
    setPrename(prename);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangePassword2 = (e) => {
    const password2 = e.target.value;
    setPassword2(password2);
  };

  

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);

    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(name, prename, email, password, phone))
        .then(() => {
          setSuccessful(true);
          props.history.push("/verify");
          window.location.reload();
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
    <div className="bg-gradient-primary" style={{'margin': '0','height': '100%','width': '100%','min-height': '100%'}}>
      <div className="container">
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
                                  <h4 className="text-dark mb-4">Create an Account!</h4>
                              </div>
                              <Form className="user" onSubmit={handleRegister} ref={form} style={{margin: '18px'}}>
                                  <div className="row mb-3">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                      <Input
                                      id="exampleFirstName"
                                      type="text"
                                      className="form-control  form-control-user"
                                      name="firstname"
                                      placeholder="First Name"
                                      value={prename}
                                      onChange={onChangePrename}
                                      validations={[required]}
                                      />
                                    </div> 
                                    <div className="col-sm-6">
                                      <Input
                                      id="exampleLastName"
                                      type="text"
                                      className="form-control form-control-user"
                                      placeholder="Last Name"
                                      name="lastname"
                                      value={name}
                                      onChange={onChangeName}
                                      validations={[required]}
                                      />
                                    </div> 
                                  </div>
                                  <div className="mb-3">
                                    <Input
                                    id="exampleInputEmail"
                                    type="email"
                                    className="form-control  form-control-user"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                    />
                                  </div>
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
                                  <div className="row mb-3">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                      <label>
                                      I agree to the Terms & Conditions 
                                      </label>
                                      
                                    </div>
                                    <div className="col-sm-6">
                                    <Input
                                        name="agree"            
                                        type="checkbox"
                                        value="agree  "
                                        validations={[required]}
                                      />
                                    </div>
                                  </div>
                                  <button className="btn btn-primary d-block btn-user w-100" type="submit" disabled={loading}>Register Account</button>
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
                                <div className="text-center"><Link to="/forgot-password" className="small">Forgot Password?</Link></div>
                                <div className="text-center d-xl-flex justify-content-xl-center"><Link to="/login" className="small">Already have an account? Login!</Link></div>
                                <div className="text-center d-xl-flex justify-content-xl-center">
                                  <td>
                                    <a className="small" href="https://heycloud.ch/terms">Terms & Conditions</a>
                                  </td>
                                  <td/>
                                  <td/>
                                  <td/>
                                  <td>
                                    <a className="small" href="https://heycloud.ch/privacy">Privacy</a>
                                  </td>
                                </div>   
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <div className="d-xl-flex mx-auto justify-content-xl-center sidebar-brand-text mx-3"><br>
          </br>
          <Link to={{ pathname: "/homepage" }}>
            <img src={logo} alt="Logo" className="d-xl-flex mx-auto justify-content-xl-center"/>
          </Link>
          <br>
          </br></div>
          <script src="assets/bootstrap/js/bootstrap.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/6.4.8/swiper-bundle.min.js"></script>
        </div>
    </div>
  </div>
  );
};

export default Register;