import React, { useState } from 'react';
import { Modal, useModalContext } from '../../context/Modal';
import SignupForm from './SignupForm';


function SignupFormModal() {
    const { showSignUpModal, setShowSignUpModal } = useModalContext();

    return (
        <>
            <button id='signupme' onClick={() => {
                setShowSignUpModal(true)

            }}>Signup</button>

        </>
    );
}

export default SignupFormModal;
