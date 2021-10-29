import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";

import UserService from "../services/user.service";
import RecentTaskEntry from "./RecentTaskEntry";

const RecentTasks = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  

  useEffect(() => {
    setLoading(true);
    UserService.listRecentTasks().then(
      (response) => {
        setContent(response.data);
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
        <div className="col-lg-7 col-xl-12">
            <div className="card shadow mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="text-primary fw-bold m-0">Recent tasks</h6>
                      <Dropdown className="no-arrow mx-1">
                        <Dropdown.Toggle className="btn btn-link btn-sm dropdown-toggle fas fa-ellipsis-v text-gray-400 no-arrow :hover{outline:none;}" style={{'background':'none','border':'none',outline: 'none','focus:outline':'none'}} onclick="this.blur();">
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                          <Dropdown.Header>Manage recent tasks</Dropdown.Header>
                          <Dropdown.Item disabled={!content} onClick={() => {
                            UserService.clearTasks()
                            setReload(true)
                          }}>Clear recent tasks</Dropdown.Item>
                          <Dropdown.Item onClick={() => {
                            setReload(true) 
                          }}>Refresh</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            {(() => {
                            if (content){
                                return (
                                  <thead>
                                    <tr>
                                      <th>Action</th>
                                      <th>Time</th>
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
                                          content.map ((recent_tasks => 
                                          <RecentTaskEntry message={recent_tasks.message} createdAt={recent_tasks.createdAt}/>
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

export default RecentTasks;
