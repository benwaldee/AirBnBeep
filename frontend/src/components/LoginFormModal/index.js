// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal, useModalContext } from '../../context/Modal';
import LoginForm from './LoginForm';


function LoginFormModal() {
    const { showLoginModal, setShowLoginModal } = useModalContext();


    return (
        <>
            <button id='loginme' onClick={() => {
                setShowLoginModal(true)
                // console.log('model opened', 'modal is', showModal)
            }}>Log In</button>

        </>
    );
}

export default LoginFormModal;
