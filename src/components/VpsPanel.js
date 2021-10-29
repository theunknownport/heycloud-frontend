import React, { useState, useEffect } from "react";
import { Dropdown, FormText } from "react-bootstrap";

import UserService from "../services/user.service";
import VpsPanelEntry from "./VpsPanelEntry";

const VpsPanel = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  

  useEffect(() => {
    setLoading(true);
    UserService.listVps().then(
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
                    <h6 className="text-primary fw-bold m-0">My Virtual Private Servers</h6>
                    <div className="dropdown no-arrow"><button className="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button"></button>
                        <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                            <p className="text-center dropdown-header">dropdown header:</p><a className="dropdown-item" href="#">&nbsp;Action</a><a className="dropdown-item" href="#">&nbsp;Another action</a>
                            <div className="dropdown-divider"></div><a className="dropdown-item" href="#">&nbsp;Something else here</a>
                        </div>
                    </div><a className="btn btn-primary" role="button" href="createvps.html">Create</a>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                    <table className="table">
                            {(() => {
                            if (content){
                                return (
                                  <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>RAM</th>
                                        <th>CPU</th>
                                        <th>Disk</th>
                                        <th>Hourly cost</th>
                                        <th>Created at</th>
                                        <th></th>
                                    </tr>
                                  </thead>
                                ) 
                            } else {
                              return null
                            }
                            })()}
                            <tbody>
                            {loading && (
                                      <span className="spinner-border spinner-border-sm"></span>
                            )}
                                  {(() => {
                                    if (content){
                                        return (
                                          content.map ((vps => 
                                          <VpsPanelEntry name={vps.name} createdAt={vps.createdAt} power={vps.isOn} is_creating={vps.isCreating} ram={vps.ram} cpu={vps.cpu} storage={vps.storage} costHourly={vps.costHourly}/>
                                        )))  
                                    } else {
                                      return (
                                      <div>
                                        <br/>
                                        <h6 className="text-primary fw-bold m-0">No recent tasks found.</h6>
                                      </div>
                                      )
                                    }
                                  })()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default VpsPanel;
