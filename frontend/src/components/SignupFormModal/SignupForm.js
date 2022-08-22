import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import img from '../LoginFormModal/x.jpg'
import exclImg from '../LoginFormModal/excl.PNG'
import { Modal, useModalContext } from '../../context/Modal';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { showSignUpModal, setShowSignUpModal } = useModalContext();

    if (sessionUser) return <Redirect to="/" />;

    const onX = () => {
        setShowSignUpModal(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors)
                        for (let error of data.errors) {
                            if (error === 'Password must be 6 characters or more.') {
                                setPassword('')
                                setConfirmPassword('')
                            }
                            if (error === 'User with that email already exists.') {
                                setEmail('')
                            }
                            if (error === 'Please provide a username with at least 4 characters.') {
                                setUsername('')
                            }
                            if (error === 'Username cannot be an email.') {
                                setUsername('')
                            }
                        }
                    };
                });
        }
        else {
            setErrors(['Confirm Password field must be the same as the Password field.'])
            setPassword('')
            setConfirmPassword('')
        }
    };

    return (
        <div className='outer_divSignup'>
            <div className="inner_divSignup">
                <div className='wrapSignupModal'>
                    <img className='signupFormX' onClick={onX} src={img}></img>
                    <div className='signuptitle'>Sign Up</div>
                    <div className='nudgeSignup'></div>
                </div>
                <div>
                    <div className='wrapWelcomeSignup'>Welcome to AirBnBeep</div>
                </div>
                <div id='errorDivSignup'>

                    {errors.map((error, idx) => {
                        return (
                            <div id='alignIndSignup'>
                                <span>
                                    <img id='errorImgSignup' src={exclImg}></img>
                                </span>
                                <div className='oneErrorDivSignup' key={idx}>{error}</div>
                            </div>
                        )
                    })}

                </div>
                <form className='formSignup' onSubmit={handleSubmit}>
                    <div>
                        <input
                            id='signupFirstName'
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            placeholder="First Name"
                        />
                    </div>
                    <div>
                        <input
                            id='signupLastName'
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            placeholder="Last Name"
                        />

                    </div>
                    <div>
                        <input
                            id='signupEmail'
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <input
                            id='signupUsername'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <input
                            id='signupPassword'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <input
                            id='signupConfirmPassword'
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirm Password"
                        />
                    </div>
                    <button id='submitSignup' type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignupFormPage;
