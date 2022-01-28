import React, { useState, useEffect } from "react";
import NavbarSide from '../components/NavBarSide';
import NavbarTop from "../components/NavBarTop"
import Footer from '../components/Footer';
import RecentTasks from '../components/RecentTasks';
import DashboardWidgets from '../components/DashboardWidgets';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import GifLoader from 'react-gif-loader';
import Preloader from '../assets/img/logos/logo-preloader.gif'
import querySearch from "stringquery";
import { CSSTransition } from 'react-transition-group';
import UserService from "../services/user.service";
import RegionPanel from "../components/RegionPanel";
import CreateRegion from "../components/CreateRegion";


const Admin = (props) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [page, setPage] = useState('default');
    useEffect(() => {
        setLoading(true);
        UserService.getUser().then(
          (response) => {
            setContent(response.data);
            setLoading(false);
            setReload(false)
            if (response.data.permission_id != 4) {
                props.history.push({
                    pathname: '/dashboard',
                });
            };
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
    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
        <div id="wrapper">
            <>
            <NavbarSide/>
            <div class="d-flex flex-column" id="content-wrapper">
                <div id="content">
                <NavbarTop user={currentUser.user}/>
                    <div class="container-fluid">
                        <div class="d-sm-flex justify-content-between align-items-center mb-4">
                            <h3 class="text-dark mb-0">Admin area</h3>
                        </div>
                        {(() => {
                            switch(page) {
                                case 'default':
                                    return <RegionPanel pageChanger={setPage}/>
                                case 'createregion':

                                    return <CreateRegion  pageChanger={setPage}/>
                            }
                        })()}
                        
                    </div>    
                </div>
                <Footer />
            </div>
            </>
        </div>
    )
}

export default Admin

