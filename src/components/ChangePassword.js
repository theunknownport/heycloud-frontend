import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import UserService from "../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../actions/auth";



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
      return null
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

const ChangePassword = () => {
    const form = useRef();
    const checkBtn = useRef();

    const onChangeOldPassword = (e) => {
        const oldpassword = e.target.value;
        setOldPassword(oldpassword);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    
    const onChangePassword2 = (e) => {
    const password2 = e.target.value;
    setPassword2(password2);
    };

    const [oldpassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false);

    const [content, setContent] = useState([]);
    const [reload, setReload] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    
    const handleChangepassword = (e) => {
      e.preventDefault();
      setSuccessful(false);
  
      setLoading(true);
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        dispatch(changePassword(oldpassword, password))
          .then(() => {
            setSuccessful(true);
            setLoading(false);
          })
          .catch(() => {
            setSuccessful(false);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
        
      };
    return (
        <div className="card shadow mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="text-primary fw-bold m-0">Password</h6>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm">
                        <Form onSubmit={handleChangepassword} ref={form}>
                            <div className="table-responsive">
                                <table className="table">
                                    <tbody>
                                        <td><span style={{fontWeight: 'bold'}}>Old password</span></td>
                                        <td>
                                            <Input
                                            id="exampleInputPassword"
                                            type="password"
                                            className="form-control form-control-user"
                                            name="password"
                                            placeholder="Password"
                                            value={oldpassword}
                                            onChange={onChangeOldPassword}
                                            validations={[required, vpassword]}
                                            />   
                                        </td>
                                        <tr></tr>
                                        <td><span style={{fontWeight: 'bold'}}>New password</span></td>
                                        <td><Input
                                            id="exampleInputPassword"
                                            type="password"
                                            className="form-control form-control-user"
                                            name="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={onChangePassword}
                                            validations={[required, vpassword, matchcreatepassword]}
                                            />
                                        </td>
                                        <tr></tr>
                                        <td><span style={{fontWeight: 'bold'}}>Repeat new password</span></td>
                                        <td><Input
                                            id="exampleInputPassword"
                                            type="password"
                                            className="form-control form-control-user"
                                            name="password2"
                                            value={password2}
                                            placeholder="Repeat password"
                                            onChange={onChangePassword2}
                                            validations={[required, vpassword, matchpassword]}
                                            />
                                        </td>
                                    </tbody>
                                </table>
                                <button className="btn btn-primary" type="submit" disabled={loading}>Change password</button>
                                {message && (
                                  <div className="form-group">
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert" style={{'margin-top':'5px'}}>
                                      {message}
                                    </div>
                                  </div>
                                )}  
                            </div>
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>                        
                    </div>
                    <div className="col-sm"/>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
