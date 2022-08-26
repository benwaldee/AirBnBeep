// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './UserMenu.css'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { Modal, useModalContext } from '../../context/Modal';
import { getUserSpotsThunk } from "../../store/spots"


function UserMenu({ user }) {
    const { showLoginModal, setShowLoginModal, setShowLoginFormSpotCard } = useModalContext();
    const dispatch = useDispatch()

    const history = useHistory()

    const location = useLocation()
    const url = location.pathname
    // console.log(url)

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
            .then(dispatch(getUserSpotsThunk(true)))
        if (url === '/host') {
            history.replace('/')
        }
        setShowLoginModal(false)
        setShowLoginFormSpotCard(false)
    };

    return (
        <div className='userMenuOuter'>
            <div className='userMenuInner'>
                <div className='logoutDiv'>
                    <button className='logout' onClick={logout}>Log Out</button>
                </div>

                <div className="userMenuAboutDiv">
                    <div className="userMenuAbout" >
                        <Link to='/' className='userMenuAboutLink'>
                            Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default UserMenu;
