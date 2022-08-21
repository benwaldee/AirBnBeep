import React, { useState, useEffect, } from "react";
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './NoUserMenu.css'
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal'



function NoUserMenu() {



    return (
        <div className='outr'>
            <div className='innr'>
                <div className='logbut'>
                    <LoginFormModal />
                </div>
                <div className='signbut'>
                    <SignupFormModal />
                </div>
                <div className="border">
                    <div className="about" >
                        <Link to='/about' className='aboutLink'>
                            About
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default NoUserMenu;
