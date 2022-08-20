// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import { useModalOn } from '../../context/modalOn'

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);
    const { modalOn, setModalOn } = useModalOn()

    return (
        <>
            <button id='loginme' onClick={() => {
                setModalOn(true)
                setShowModal(true)
                // console.log('model opened', 'modal is', modalOn)
            }}>Log In</button>
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false)
                    setModalOn(false)
                    // console.log('closed modal', "modal is:", modalOn)

                }}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
