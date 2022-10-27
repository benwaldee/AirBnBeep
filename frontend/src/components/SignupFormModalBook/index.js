import React, { useState } from 'react';
import { Modal, useModalContext } from '../../context/Modal';
import SignupForm from './SignupForm';


function SignupFormModal() {
    const { showSignUpModal, setShowSignUpModal } = useModalContext();

    return (
        <>
            <button className='menubutton booklogin' id='signupme' onClick={() => {
                setShowSignUpModal(true)

            }}>Sign up</button>

        </>
    );
}

export default SignupFormModal;
