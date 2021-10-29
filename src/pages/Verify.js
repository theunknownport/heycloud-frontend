import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, Redirect } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";



import { register, verify } from "../actions/auth";
import { setMessage } from "../actions/message";

import logo from './../assets/img/logos/logo-white-small.png'
import illustration from './../assets/img/illustrations/secure1.png'

const required = (value) => {
  if (!value) {
    return (
      <div role="alert" style={{"marginTop":"5px","color":"red"}}>
        This field is required!
      </div>
    );
  }
};


const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

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

  

  

  const handleVerify = (e) => {
    e.preventDefault();
    setSuccessful(false);

    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(verify(phone,code))
        .then(() => {
          setSuccessful(true);
          props.history.push("/login");
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
                                  <h4 className="text-dark mb-4">Verify your Account!</h4>
                              </div>
                              <Form className="user" onSubmit={handleVerify} ref={form} style={{margin: '18px'}}>
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
                                  <div className="mb-3">
                                    <Input
                                    id="exampleInputCode"
                                    type="text"
                                    className="form-control  form-control-user"
                                    placeholder="Code"
                                    name="code"
                                    value={code}
                                    onChange={onChangeCode}
                                    validations={[required]}
                                    />
                                  </div>
                                    
                                  
                                  <button className="btn btn-primary d-block btn-user w-100" type="submit" disabled={loading}>Verify Account</button>
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