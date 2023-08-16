import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { addRegion } from "../actions/admin";
import CheckButton from "react-validation/build/button";


const required = (value) => {
  if (!value) {
    return (
      <div role="alert" style={{"marginTop":"5px","color":"red"}}>
        This field is required!
      </div>
    );
  }
};

const CreateRegionForm = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [fullName, setFullName] = useState("");
  const [shortName, setShortName] = useState("");
  const [proxHost, setProxHost] = useState("");
  const [proxPort, setProxPort] = useState(0);
  const [password, setPassword] = useState("");
  const [proxUser, setProxUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0)

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else if(step === 3) {
        
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onChangeFullName = (e) => {
    const fullName = e.target.value;
    setFullName(fullName);
  };

  const onChangeShortName = (e) => {
    const shortName = e.target.value;
    setShortName(shortName);
  };

  const onChangeProxHost = (e) => {
    const proxHost = e.target.value;
    setProxHost(proxHost);
  };

  const onChangeProxPort = (e) => {
    const proxPort = e.target.value;
    setProxPort(proxPort);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeProxUser = (e) => {
    const proxUser = e.target.value;
    setProxUser(proxUser);
  };

  const handleCreateRegion = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(addRegion(fullName, shortName, proxHost, proxPort, password, proxUser))
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

  return (
    <Form className="user" onSubmit={handleCreateRegion} ref={form} style={{margin: '18px'}}>
      <div className="mb-3">
          <Input
          id="InputFullName"
          type="text"
          className="form-control  form-control-user"
          placeholder="Full Name"
          name="fullName"
          value={fullName}
          onChange={onChangeFullName}
          validations={[required]}
          />
      </div>
      <div className="mb-3">
          <Input
          id="InputShortName"
          type="text"
          className="form-control form-control-user"
          name="shortName"
          placeholder="Short Name"
          value={shortName}
          onChange={onChangeShortName}
          validations={[required]}
          />
      </div>
      <div className="mb-3">
          <Input
          id="InputProxHost"
          type="text"
          className="form-control form-control-user"
          name="proxHost"
          placeholder="Proxmox IP or Hostname"
          value={proxHost}
          onChange={onChangeProxHost}
          validations={[required]}
          />
      </div>
      <div className="mb-3">
          <Input
          id="InputProxPort"
          type="number"
          className="form-control form-control-user"
          name="proxPort"
          placeholder="Promox API Port"
          value={proxPort}
          onChange={onChangeProxPort}
          validations={[required]}
          />
      </div>
      <div className="mb-3">
          <Input
          id="InputProxUser"
          type="text"
          className="form-control form-control-user"
          name="proxUser"
          placeholder="Proxmox API User"
          value={proxUser}
          onChange={onChangeProxUser}
          validations={[required]}
          />
      </div>
      <div className="mb-3">
          <Input
          id="InputPassword"
          type="password"
          className="form-control form-control-user"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
          validations={[required]}
          />
      </div>
      <div className="mb-3">
      </div><button className="btn btn-primary d-block btn-user w-100" type="submit" disabled={loading}>Create Region
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
  )
}

export default CreateRegionForm