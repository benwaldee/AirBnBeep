// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal'
import './Navigation.css';
import img from './logocopy.png'
import NoUser from './NoUser.js'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()

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
            // <>
            //     <LoginFormModal />
            //     <SignupFormModal />
            // </>
        );
    }

    return (
        <div className='outer'>
            <div className='inner'>
                <div className='logoDiv' onClick={homeClick}>
                    <img className='logo' src={img}></img>

                </div>
                <div className='fileDiv' >
                    {isLoaded && sessionLinks}
                </div>
            </div>
        </div>
    );
}

export default Navigation;
