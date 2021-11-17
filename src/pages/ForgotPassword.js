import React from 'react'
import SendCode from '../components/SendCode'
import ResetPassword from '../components/ResetPassword'
import { Link } from "react-router-dom";
import logo from './../assets/img/logos/logo-white-small.png'
import EarlyFooter from '../components/EarlyFooter';

const ForgotPassword = (view, props) => {
    return (
    <div className="bg-gradient-primary" style={{'margin': '0','height': '100%','width': '100%','min-height': '100%'}}>
        <div className="container">
            { (() => {
                if (view.view == "send-code") {
                    return <SendCode props= {props}/>
                } else {
                    return <ResetPassword />
                }
            })()}
            <div className="text-center d-xl-flex justify-content-xl-center">
            <EarlyFooter />
            <script src="assets/bootstrap/js/bootstrap.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/6.4.8/swiper-bundle.min.js"></script>       
            </div>
        </div>
    </div>
    )
}

export default ForgotPassword
