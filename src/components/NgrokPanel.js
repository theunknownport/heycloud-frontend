import React, { useState, useEffect } from "react";
import { Dropdown, FormText } from "react-bootstrap";

import UserService from "../services/user.service";
import NgrokPanelEntry from "./NgrokPanelEntry";

const NgrokPanel = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  

  useEffect(() => {
    setLoading(true);
    UserService.listNgrokTokens().then(
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
                    <h6 className="text-primary fw-bold m-0">My ngrok tokens</h6>
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
                                        <th>Assinged controller</th>
                                        <th>Created at</th>
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
                                    if (!content){
                                        return (
                                          content.map ((ngrok_token => 
                                          <NgrokPanelEntry name={ngrok_token.name} createdAt={ngrok_token.createdAt} assingedController={ngrok_token.controllerName}/>
                                        )))  
                                    } else {
                                      return (
                                      <div>
                                        <br/>
                                        <h6 className="text-primary fw-bold m-0">No ngrok tokens found</h6>
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

export default NgrokPanel;
