// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'
import menuIcon from './menuIcon.PNG'
import UserMenu from "../Menu.js/UserMenu";



function ProfileButton({ user }) {
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
        <>
            <div className='profile' onClick={openMenu}>
                <span>
                    <img className='menuIcon' src={menuIcon}>
                    </img>
                </span>
                <span>
                    <img className='noUser' src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg">
                    </img>
                </span>
            </div>
            {showMenu && (
                <UserMenu />
            )}
        </>
    );
}

export default ProfileButton;
