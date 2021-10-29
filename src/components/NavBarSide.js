import React from 'react'
import logo from './../assets/img/logos/logo-white-small.png'
import { FaTachometerAlt, FaServer, FaNetworkWired } from 'react-icons/fa'
import { MdSecurity } from 'react-icons/md'
import { NavLink, Link } from 'react-router-dom'


const NavbarSide = () => {
    return (
    <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
        <div className="container-fluid d-flex flex-column p-0" style={{'marginTop':'5px'}}>
            <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0">
                <Link to="/homepage">
                    <img src={logo} style={{'width':'90px', 'height':'90px'}}/>
                </Link>
            </a>
            <br>
            </br>
            <ul className="navbar-nav text-light" id="accordionSidebar" style={{'marginTop':'15px'}}>
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