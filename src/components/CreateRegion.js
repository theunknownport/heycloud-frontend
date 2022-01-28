import React, { useState, useEffect } from "react";
import { Dropdown, FormText } from "react-bootstrap";

import UserService from "../services/user.service";
import RegionEntry from "./RegionEntry";

const CreateRegion = ({pageChanger}) => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
  
    
  
    useEffect(() => {
      setLoading(true);
      UserService.listRegions().then(
        (response) => {
          console.log(response.data)
          setContent(response.data)
          setLoading(false);
          setReload(false)
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  
          setContent(_content);
        }
      );
    }, [reload]);
    return (
      <div className="row">
          <div className="col-lg-11 col-xl-12">
              <div className="card shadow mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                      <h6 className="text-primary fw-bold m-0">Create region</h6>
                      <div className="dropdown no-arrow"><button className="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button"></button>
                          <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                              <p className="text-center dropdown-header">dropdown header:</p><a className="dropdown-item" href="#">&nbsp;Action</a><a className="dropdown-item" href="#">&nbsp;Another action</a>
                              <div className="dropdown-divider"></div><a className="dropdown-item" href="#">&nbsp;Something else here</a>
                          </div> 
                      </div>
                      <button className="btn btn-primary" onClick={() => pageChanger('default')}>Back</button>
                  </div>
                  <div className="card-body">
                      
                      
                  </div>
              </div>
          </div>
      </div>
    );
  };
  
  export default CreateRegion;
