import React, { useState, useEffect } from "react";
import logo from './../assets/img/logos/logo-white-small.png'
import { FaTachometerAlt, FaServer, FaNetworkWired, FaSlidersH } from 'react-icons/fa'
import { MdSecurity } from 'react-icons/md'
import { NavLink, Link } from 'react-router-dom'
import UserService from "../services/user.service";
import BarLoader from 'react-bar-loader'

const NavbarSide = () => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        setLoading(true);
        UserService.getUser().then(
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
    <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
        <div className="container-fluid d-flex flex-column p-0" style={{'marginTop':'5px'}}>
            <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0">
                <Link to="/homepage">
                    <img src={logo} style={{'width':'90%', 'height':'90%'}}/>
                </Link>
            </a>
            {loading && (
            <>
                <BarLoader color="#1D8BF1" height="2" style={{'padding-top':'5px'}}/>
            </>
            )}
            <br>
            </br>
            <ul className="navbar-nav text-light" id="accordionSidebar" style={{'marginTop':'15px'}}>
                {(() => {
                    if (content){
                        if (content.permission_id == 4) {
                            return (
                                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" exact to="admin" onlyActiveOnIndex><FaSlidersH className="fa " style={{'transform': 'scale(1.22)','margin-bottom': '4px'}} /><span style={{'margin': '13px'}}>&nbsp;Admin</span></NavLink></li>
                            ) 
                        }
                        return null
                    } else {
                        return null
                    }
                })()}
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" exact to="dashboard" onlyActiveOnIndex><FaTachometerAlt className="fa " style={{'transform': 'scale(1.22)','margin-bottom': '4px'}} /><span style={{'margin': '13px'}}>&nbsp;Dashboard</span></NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" exact to="vps"  onlyActiveOnIndex><FaServer className="fa " style={{'transform': 'scale(1.22)','margin-bottom': '4px'}} /><span style={{'margin': '13px'}}>VPS</span></NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" exact to="networking" onlyActiveOnIndex><FaNetworkWired className="fa " style={{'transform': 'scale(1.22)','margin-bottom': '4px'}} /><span style={{'margin': '13px'}}>Networking</span></NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" exact to="security" onlyActiveOnIndex><MdSecurity className="md" style={{'transform': 'scale(1.22)','margin-bottom': '4px'}} /><span style={{'margin': '13px'}}>Security</span></NavLink></li>
            </ul>
        </div>
    </nav>
    )
}

export default NavbarSide