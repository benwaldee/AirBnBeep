// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );



    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <div className='outer_div'>
            <div className='inner_div'>
                <div className='logtitle'>Log in or sign up</div>
                <div className='welcome'>Welcome to Airbnbeep</div>
                <form className='form' onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div className='username'>
                        <input
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                            placeholder='Username or Email'
                        />
                    </div>
                    <div className='password'>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Password'
                        />
                    </div>

                    <button type="submit">Continue</button>
                </form>
                <div className='orWrapper'>
                    <span className='line'></span>
                    <span className='or'>or</span>
                    <span className='line'></span>
                </div>
                <div className='continues'>
                    <div className='fbDiv'>
                        <img></img>
                        <div>Continue with Facebook</div>
                    </div>
                    <div className='gDiv'>
                        <img></img>
                        <div>Continue with Google</div>
                    </div>
                    <div className='apDiv'>
                        <img></img>
                        <div>Continue with Apple</div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default LoginFormPage;
