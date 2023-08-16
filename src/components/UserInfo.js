import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import AccountService from "../services/account.service";


const UserInfo = (props) => {

    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [portalUrl, setPortalUrl] = useState(null);

    useEffect(() => {
        setLoading(true);
        UserService.getUser().then(
          (response) => {
            console.log(response.data);
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

    function generatePortal() {
      AccountService.getPortalSession().then(
            (response) => {
              setPortalUrl(response.data.url);
              setLoading(false);
              setReload(false)
              console.log(response.data)
              global.window && (global.window.location.href = response.data.url);
              return null;
            },
            (error) => {
              const _content =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
      
              setPortalUrl(_content);
            }
          );
    }; 
    return (
        <div className="row">
        <div className="col-lg-7 col-xl-12">
            <div className="card shadow mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="text-primary fw-bold m-0">Customer information</h6>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm">
                            <div className="table-responsive">
                                <table className="table">
                                    <tbody>
                                    {loading && (
                                      <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                        <td><span style={{fontWeight: 'bold'}}>Name</span></td>
                                        <td>{content.prename + " " + content.name}</td>
                                        <tr></tr>
                                        <td><span style={{fontWeight: 'bold'}}>Email</span></td>
                                        <td>{content.email}</td>
                                        <tr></tr>
                                        <td><span style={{fontWeight: 'bold'}}>Phone</span></td>
                                        <td>{content.phone}</td>
                                    </tbody>
                                </table>
                            </div>
                            <button class="btn btn-primary" type="button"
                                onClick={() => generatePortal()}
                                disabled={loading}
                            >Edit customer information
                            </button>                        
                        </div>
                        <div className="col-sm"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default UserInfo
