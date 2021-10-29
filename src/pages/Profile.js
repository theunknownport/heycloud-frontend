import { React, useCallback, useState } from 'react'
import NavbarSide from '../components/NavBarSide';
import NavbarTop from "../components/NavBarTop"
import Footer from '../components/Footer';
import DashboardWidgeds from '../components/DashboardWidgeds';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import ChangePassword from '../components/ChangePassword';


const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    return (
        <div id="wrapper">
            <NavbarSide/>
            <div class="d-flex flex-column" id="content-wrapper">
                <div id="content">
                    <NavbarTop user={currentUser.user}/>
                    <div class="container-fluid">
                        <div class="d-sm-flex justify-content-between align-items-center mb-4">
                            <h3 class="text-dark mb-0">Profile</h3>
                        </div>
                        <UserInfo user={currentUser.user}/>
                        <ChangePassword />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Profile

