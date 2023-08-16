import React from 'react'
import SendCode from '../components/SendCode'
import ResetPassword from '../components/ResetPassword'
import { Link } from "react-router-dom";
import logo from './../assets/img/logos/logo-white-small.png'
import EarlyFooter from '../components/EarlyFooter';

const NotFound = (view, props) => {
    return (
        <div className="bg-gradient-primary" style={{'margin': '0','height': '100%','width': '100%','min-height': '100%'}}>
        <div className="container">
                <div className="row justify-content-center">
                <div className="col-md-9 col-lg-12 col-xl-10">
                <div className="card shadow-lg o-hidden border-0 my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-7 col-xl-6 offset-xl-0">
                                <div className="align-items-center align-content-center p-5 justify-content-center">
                                    <div className="text-center align-items-center text-center align-items-center align-content-center justify-content-xl-center ">
                                    <h4 class="text-dark mb-2 align-content-center justify-content-xl-center">404</h4>
                                                <p class="mb-4">Looks like this page doesn't exist.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            <div className="text-center d-xl-flex justify-content-xl-center">
            <EarlyFooter />
            <script src="assets/bootstrap/js/bootstrap.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/6.4.8/swiper-bundle.min.js"></script>       
            </div>
        </div>
    </div>  
    )
}

export default NotFound
