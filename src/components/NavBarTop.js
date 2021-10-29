import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Dropdown } from "react-bootstrap";


export const NavbarTop = (props) => {

    if (!props.user) {
        global.window && (global.window.location.href = '/dashboard');
        return null;
    }


    return (
        <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
            <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars"></i></button>
                <form className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group"><input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..."/><button className="btn btn-primary py-0" type="button"><i className="fas fa-search"></i></button></div>
                </form>
                <ul className="navbar-nav flex-nowrap ms-auto">
                    <li className="nav-item dropdown d-sm-none no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><i className="fas fa-search"></i></a>
                        <div className="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
                            <form className="me-auto navbar-search w-100">
                                <div className="input-group"><input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..."/>
                                    <div className="input-group-append"><button className="btn btn-primary py-0" type="button"><i className="fas fa-search"></i></button></div>
                                </div>
                            </form>
                        </div>
                    </li>
                    <li class="nav-item dropdown no-arrow mx-1"></li>
                    <div className="d-none d-sm-block topbar-divider"></div>
                    <li className="nav-item dropdown no-arrow">
                        <Dropdown className="nav-item dropdown no-arrow">
                            <Dropdown.Toggle class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" style={{'background':'none','border':'none',outline: 'none'}}>
                                <span class="d-none d-lg-inline me-2 text-gray-600 small" style={{'background':'none','border':'none',outline: 'none'}}>{props.user.prename + " " + props.user.name}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                                <Dropdown.Header>User settings</Dropdown.Header>
                                <Dropdown.Item as={Link} to="/profile"><i class="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Profile</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item as={Link} to="/logout"><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavbarTop