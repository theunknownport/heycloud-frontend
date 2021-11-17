import React, { useState, useEffect } from "react";
import NavbarSide from '../components/NavBarSide';
import NavbarTop from "../components/NavBarTop"
import Footer from '../components/Footer';
import RecentTasks from '../components/RecentTasks';
import DashboardWidgeds from '../components/DashboardWidgeds';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import GifLoader from 'react-gif-loader';
import Preloader from '../assets/img/logos/logo-preloader.gif'
import querySearch from "stringquery";
import { CSSTransition } from 'react-transition-group';



const Dashboard = (props) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [preloaderState, setPreloaderState] = useState(false);
    

    useEffect(() => {
        if (querySearch(props.location.search).preloader) {
            setPreloaderState(true)
            setTimeout(() => {
                setPreloaderState(false)
            }, 600)
        }
    }, []);

    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    return (
        <div id="wrapper">
            {preloaderState ? (
                <GifLoader
                loading={preloaderState}
                imageSrc={Preloader}
                imageStyle={{height: '20%',' margin-left': 'auto','margin-right': 'auto', 'margin-top': '15%'}}
                overlayBackground="rgba(255,255,255,255)"
                />
                ) : (
                <>
                <NavbarSide/>
                <div class="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                    <NavbarTop user={currentUser.user}/>
                        <div class="container-fluid">
                            <div class="d-sm-flex justify-content-between align-items-center mb-4">
                                <h3 class="text-dark mb-0">Dashboard</h3>
                            </div>
                            <DashboardWidgeds />
                            <RecentTasks />
                        </div>
                    </div>
                    <Footer />
                </div>
                </>
                )

            }
        </div>
    )
}

export default Dashboard

