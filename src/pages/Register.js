import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat from 'react-number-format';
import { Link, Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import EarlyFooter from "../components/EarlyFooter";
import { isEmail } from "validator";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { register } from "../actions/auth";
import { setMessage } from "../actions/message";
import { parsePhoneNumber } from 'libphonenumber-js'
import GifLoader from 'react-gif-loader';
import Preloader from '../assets/img/logos/logo-preloader.gif'
import illustration from './../assets/img/illustrations/cloud1.png'
import BarLoader from 'react-bar-loader'



const required = (value) => {
  if (!value) {
    return (
      <div role="alert" style={{"marginTop":"5px","color":"red"}}>
        This field is required!
      </div>
    );
  }
};

const checked = (checked) => {
  if (!checked) {
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

  const [phoneValidMessage, setPhoneValidMessage] = useState("initial")
  const [name, setName] = useState("");
  const [prename, setPrename] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const stateRef = useRef();

  const onChangePhone = value => {
    setPhone(value)
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

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);

    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0 && phoneValidMessage == "") {
      dispatch(register(name, prename, email, password, phone))
        .then(() => {
          setSuccessful(true);
          props.history.push({
            pathname: '/verify',
            search:'phone=' + phone,
          });
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
                                  <h4 className="text-dark mb-4">Create your heycloud account.</h4>
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
                                    className="form-control form-control-user"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}        
                                    validations={[required]}
                                    />
                                  </div>
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
                                    buttonStyle={{'border-radius': '10rem', color: 'unset !important', 'background-color': 'unset !important', padding: '2%', transition: 'none'}}
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
                                          validations={[vpassword, matchcreatepassword, required]}
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
                                        validations={[vpassword, matchpassword, required]}
                                        />
                                      </div>
                                  </div>
                                  <div className="row mb-3">
                                      <label>
                                      I agree to the <a  href="https://heycloud.ch/terms">Terms & Conditions</a> 
                                      </label>
                                      <Input
                                        name="agree"            
                                        type="checkbox"
                                        required
                                      />
                                  </div>
                                  <button className="btn btn-primary d-block btn-user w-100" type="submit" disabled={loading}>Create account</button>
                                  {loading && (
                                    <>
                                      <BarLoader color="#1D8BF1" height="2" style={{'padding-top':'5px'}}/>
                                    </>
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
                                <div className="text-center"><Link to="/forgot-password" className="small">Forgot password?</Link></div>
                                <div className="text-center d-xl-flex justify-content-xl-center"><Link to="/login" className="small">Already have an account? Login!</Link></div>
                                <div className="text-center d-xl-flex justify-content-xl-center"><a className="small" href="https://heycloud.ch/terms">Terms & Conditions</a></div>
                                <div className="text-center d-xl-flex justify-content-xl-center"><a className="small" href="https://heycloud.ch/privacy">Privacy</a></div>
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
    </div>
  </div>
  );
};

export default Register;