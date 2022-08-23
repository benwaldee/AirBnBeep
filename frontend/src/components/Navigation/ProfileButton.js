// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'
import menuIcon from './menuIcon.PNG'
import UserMenu from "../Menu/UserMenu";



function ProfileButton({ user }) {

    console.log('i rendered')

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <div className='outerProfileButton'>
            <div className='profile' onClick={openMenu}>
                <span>
                    <img className='menuIcon' src={menuIcon}>
                    </img>
                </span>
                <span>
                    <img className='noUser' src="https://png.pngitem.com/pimgs/s/627-6275754_chad-profile-pic-profile-photo-circle-png-transparent.png">
                    </img>
                </span>
            </div>
            {showMenu && (
                <UserMenu />
            )}
        </div>
    );
}

export default ProfileButton;
