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
import Search from '../Search/Search';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const { showLoginFormHost, setShowLoginFormHost, setUserSearch } = useModalContext();
    let allSpots = useSelector(state => state?.spots?.allSpots)
    if (allSpots) {
        allSpots = Object.values(allSpots)
    }


    const homeClick = () => {
        setUserSearch("")
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



    return (
        <>
            <div className='outer'>
                <div className='inner'>
                    <div className='logoDiv' onClick={homeClick}>
                        <img className='logo' src={img}></img>

                    </div>
                    <Search allSpots={allSpots} />
                    <div className='fileDiv' >

                        {sessionUser && <Link className='hostLink' onClick={() => setUserSearch("")} to='/'> Go back home </Link>}
                        {!sessionUser && <div className='hostLink' onClick={() => {
                            setUserSearch("")
                            setShowLoginFormHost(true)
                        }}> Become a Host </div>}
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
