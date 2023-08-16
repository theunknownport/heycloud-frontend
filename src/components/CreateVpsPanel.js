import React, { useState, useEffect } from "react";
import { Dropdown, FormText } from "react-bootstrap";

import UserService from "../services/user.service";
import CreateVpsForm from "./Forms/CreateVpsForm";

const CreateVpsPanel = () => {
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
                    <CreateVpsForm />
                </div>
            </div>
        </div>
    </div>
  );
};

export default CreateVpsPanel;
