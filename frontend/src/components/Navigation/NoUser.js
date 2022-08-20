// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './NoUser.css'
import menuIcon from './menuIcon.PNG'
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal'
import { Modal, useModalContext } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupForm from '../SignupFormModal/SignupForm';


function NoUser() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [clickedLogin, setClickedLogin] = useState(false);
    const [clickedSignUp, setClickedSignUp] = useState(false);
    const { showLoginModal, setShowLoginModal } = useModalContext();
    const { showSignUpModal, setShowSignUpModal } = useModalContext();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(!showMenu);
    };


    useEffect(() => {
        if (!showMenu) return;

        const loginMe = document.getElementById('loginme')
        const signUpMe = document.getElementById('signupme')

        const closeMenu = (e) => {

            if (e.target === loginMe) { setClickedLogin(true) }
            if (e.target === signUpMe) { setClickedSignUp(true) }
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


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
            {showLoginModal && clickedLogin && (
                <Modal onClose={() => {
                    setShowLoginModal(false)
                }}>
                    <LoginForm />
                </Modal>
            )}
            {showSignUpModal && clickedSignUp && (
                <Modal onClose={() => {
                    // setModalOn(false)
                    setShowSignUpModal(false)

                }}>
                    <SignupForm />
                </Modal>
            )}
        </>
    );
}

export default NoUser;
