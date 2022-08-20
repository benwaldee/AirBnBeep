// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './NoUser.css'
import menuIcon from './menuIcon.PNG'
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal'
import { useModalOn } from '../../context/modalOn'



function NoUser() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const { modalOn, setModalOn } = useModalOn()

    const openMenu = () => {
        // if (showMenu) return;
        setShowMenu(!showMenu);
    };

    // console.log('rerender comp', 'modal is', modalOn)

    useEffect(() => {
        if (!showMenu) return;
        if (modalOn) return

        const ignore1 = document.getElementById('loginme')
        const ignore2 = document.getElementById('signupme')
        // const ignore3 = document.getElementById('ex1')


        const closeMenu = (e) => {



            if (e.target === ignore1 || e.target === ignore2) {


                return
            }

            setShowMenu(false);
        };


        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu, modalOn]);

    // console.log(showMenu)

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
                <div>
                    <LoginFormModal />
                    <SignupFormModal />
                </div>
            )}
        </>
    );
}

export default NoUser;
