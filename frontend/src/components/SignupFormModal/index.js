import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
// import { useModalOn } from '../../context/modalOn'

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);
    // const { modalOn, setModalOn } = useModalOn()
    return (
        <>
            <button id='signupme' onClick={() => {
                // setModalOn(true)
                setShowModal(true)

            }}>Signup</button>
            {showModal && (
                <Modal onClose={() => {
                    // setModalOn(false)
                    setShowModal(false)

                }}>
                    <SignupForm />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;
