// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './UserMenu.css'




function UserMenu({ user }) {

    const dispatch = useDispatch()

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (

        <div className='userMenu'>
            <button className='logout' onClick={logout}>Log Out</button>
        </div>

    );
}

export default UserMenu;
