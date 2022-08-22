// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, useModalContext } from '../../context/Modal';
import img from './x.jpg'
import exclImg from './excl.PNG'

import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const { showLoginModal, setShowLoginModal } = useModalContext();

    const onX = () => {
        setShowLoginModal(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                    setPassword('')
                    setCredential('')
                }
            });
    }


    return (
        <div className='outer_div'>
            <div className='inner_div'>
                <div className='wrapLoginModal'>
                    <img className='loginFormX' onClick={onX} src={img}></img>
                    <div className='logtitle'>Log in</div>
                    <div className='nudgeLogin'></div>
                </div>
                <div className='wrapWelcomeLogin'>
                    <div className='welcome'>Welcome to AirBnBeep</div>
                </div>
                <div id='errorDivLogin'>

                    {errors.map((error, idx) => {
                        return (
                            <>
                                <span>
                                    <img id='errorImgLogin' src={exclImg}></img>
                                </span>
                                <div className='oneErrorDivLogin' key={idx}>{error}</div>
                            </>
                        )
                    })}

                </div>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='username'>
                        <input
                            id='loginCred'
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                            placeholder='Username or Email'
                        />
                    </div>
                    <div className='password'>
                        <input
                            id='loginPword'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Password'
                        />
                    </div>

                    <button id='submitLogin' type="submit">Continue</button>
                </form>
                <div className='orWrapper'>
                    <div className='line'></div>
                    <div className='or'>or</div>
                    <div className='line'></div>
                </div>
                <div className='demo'>
                    <div className='demoUser'>
                        <button id='submitDemo' onClick={(e) => {
                            setCredential('johnbon')
                            setPassword('johnbon99!')
                        }}>Demo User</button>
                    </div>



                </div>
            </div>
        </div>
    );
}

export default LoginFormPage;
