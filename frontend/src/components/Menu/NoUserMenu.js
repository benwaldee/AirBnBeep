import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './UserMenu.css'
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal'



function NoUserMenu() {

    return (
        <div>
            <LoginFormModal />
            <SignupFormModal />
        </div>

    );
}

export default NoUserMenu;
