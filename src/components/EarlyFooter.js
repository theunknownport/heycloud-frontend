import React from 'react'
import logo from './../assets/img/logos/logo-white-small.png'
import { Link } from 'react-router-dom';

const EarlyFooter = () => {
    return (
        <div className="footer">

            <div className="d-flex mx-auto justify-content-center sidebar-brand-text mx-3 align-self-center">
                <div className="row mb-3">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Link to={{ pathname: "/homepage" }}>
                        <img src={logo} alt="Logo" className="align-self-center"/>
                        </Link>
                    </div>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <h4 className="text-white" style={{'font-family': 'Oswald, bold', 'font-weight': '500', 'marginTop': '12%'}}>{"{Beta}"}</h4>
                    </div>
                </div>
            </div>
            <div className="d-flex mx-auto justify-content-center sidebar-brand-text mx-3 align-self-center">
               
            </div>
        </div>
    )
}

export default EarlyFooter
