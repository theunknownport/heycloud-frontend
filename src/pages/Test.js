import { React, useCallback, useState } from 'react'
import NavbarSide from '../components/NavBarSide';
import NavbarTop from "../components/NavBarTop"
import Footer from '../components/Footer';
import NgrokPanel from '../components/NgrokPanel';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import NewWindow from 'react-new-window'
import AuthIFrame from "react-auth-iframe";



const Test = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    if (!currentUser) {
        return <Redirect to="/login" />;
      }
    return (
    <div>
        <NewWindow>
            <AuthIFrame
            src="https://localhost:8000/vm/17/console"
            token={currentUser.access_token}
            type="html" />
        </NewWindow>
    </div>
    )
}

export default Test
