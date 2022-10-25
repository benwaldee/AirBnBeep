// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal'
import './Navigation.css';
import img from './logocopy.png'
import NoUser from './NoUser.js'
import { Modal, useModalContext } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const { showLoginFormHost, setShowLoginFormHost } = useModalContext();


    const homeClick = () => {
        history.push('/')
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <NoUser />
        );
    }

    console.log(window.location.pathname)

    return (
        <>
            <div className='outer'>
                <div className='inner'>
                    <div className='logoDiv' onClick={homeClick}>
                        <img className='logo' src={img}></img>

                    </div>
                    <div className='fileDiv' >

                        {sessionUser && <Link className='hostLink' to='/'> Go back home </Link>}
                        {!sessionUser && <div className='hostLink' onClick={() => setShowLoginFormHost(true)}> Become a Host </div>}
                        {!sessionUser && showLoginFormHost && (
                            <Modal onClose={() => {
                                setShowLoginFormHost(false)

                            }}>
                                <LoginForm />
                            </Modal>
                        )}
                        {isLoaded && sessionLinks}
                    </div>
                </div>
            </div>

        </>
    );
}

export default Navigation;
