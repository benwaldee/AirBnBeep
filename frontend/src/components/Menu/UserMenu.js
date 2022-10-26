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
        if (url === '/host' || url === '/bookings') {
            history.replace('/')
        }
        setShowLoginModal(false)
        setShowLoginFormSpotCard(false)
    };

    const handleBook = () => {
        history.push('/bookings')
    }

    return (
        <div className='userMenuOuter'>
            <div className='userMenuInner'>
                <div className='logoutDiv'>
                    <button className='logout' onClick={logout}>Log Out</button>
                </div>
                <div className='logoutDiv'>
                    <button className='logout' onClick={handleBook}>My Bookings</button>
                </div>
                <div className="userMenuAboutDiv">
                    <div className="userMenuAbout" >
                        <div className='toplinkspace'>
                            <Link to='/' className='aboutLink'>
                                Home
                            </Link>
                        </div>

                        <div className='bottomlinkspace'>
                            <Link to='/about' className='aboutLink'>
                                About
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default UserMenu;
