// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './UserMenu.css'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Modal, useModalContext } from '../../context/Modal';



function UserMenu({ user }) {
    const { showLoginModal, setShowLoginModal } = useModalContext();
    const dispatch = useDispatch()

    const history = useHistory()

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        setShowLoginModal(false)
        history.push('/')
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
