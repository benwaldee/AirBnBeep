import './Book.css'
import { getAllSpotsThunk } from "../../store/spots"
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { updateUserBookingThunk, deleteUserBookingThunk, addUserBookingThunk } from "../../store/bookings"
import exclImg from '../LoginFormModal/excl.PNG'
import LoginFormModal from '../LoginFormModalBook';
import SignupFormModal from '../SignupFormModalBook'
import { Modal, useModalContext } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupForm from '../SignupFormModal/SignupForm';

const Book = ({ userBooking, booked, setBooked, setToggleRender, toggleRender, spotID, sessionUser }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [editClick, setEditClick] = useState(false)
    const [deleteClick, setDeleteClick] = useState(false)
    const [newStart, setNewStart] = useState(userBooking?.startDate)
    const [newEnd, setNewEnd] = useState(userBooking?.endDate)
    const [errors, setErrors] = useState([])

    const [addStart, setAddStart] = useState("")
    const [addEnd, setAddEnd] = useState("")
    const { showLoginModal, setShowLoginModal } = useModalContext();
    const { showSignUpModal, setShowSignUpModal } = useModalContext();

    const today = new Date();
    let min = today.toISOString().slice(0, 8)
    let last = Number(today.toISOString().slice(8, 10)) + 1
    min = min + last

    if (sessionUser) {
        setShowLoginModal(false)
        setShowSignUpModal(false)
    }

    const handleSave = async () => {
        setErrors([])

        let caught = false

        await dispatch(updateUserBookingThunk(Number(userBooking.id), { startDate: newStart, endDate: newEnd }))
            .catch(async (res) => {

                caught = true

                const data = await res.json();
                if (data && data.errors) {
                    setErrors([Object.values(data.errors)[0]])
                    setNewStart(userBooking.startDate)
                    setNewEnd(userBooking.endDate)

                }


            })
            .then(() => {

                if (caught === false) {
                    setEditClick(false)
                    setErrors([])
                }
            })





    }

    const handleDelete = () => {

        dispatch(deleteUserBookingThunk(Number(userBooking.id)))
        setToggleRender(!toggleRender)
        setBooked("past/none")
        setErrors([])
    }

    const handleAdd = async () => {

        setErrors([])
        let caught = false

        if (addStart === "" || addEnd === "") {
            setErrors(["Please select a start and end date"])

            return
        }

        await dispatch(addUserBookingThunk(spotID, { startDate: addStart, endDate: addEnd }))
            .catch(async (res) => {
                caught = true
                const data = await res.json();
                if (data && data.errors) {
                    setErrors([Object.values(data.errors)[0]])
                    setAddStart("")
                    setAddEnd("")
                }
            })
            .then(() => {
                if (caught === false) {
                    setBooked("future")
                    setAddStart("")
                    setAddEnd("")
                    setDeleteClick(false)
                    setEditClick(false)
                    setErrors([])
                }
            })
        setToggleRender(!toggleRender)
    }

    // console.log("booked", booked)

    return (
        <>
            <div className="Book_outer">
                {booked === "login" &&
                    <div className='Book_emptyWrap'>
                        <h2 className='Book_emptyH2'>Bookings</h2>
                        <div className='Book_emptySub'>
                            Would you like to book this awesome spot? Log in or sign up to book the vacation of your dreams!
                        </div>
                        <div className='Book_emptyTimeCenter Book_logout'>
                            <div className='logbut'>
                                <LoginFormModal />
                            </div>
                            <div className='signbut'>
                                <SignupFormModal />
                            </div>
                        </div>
                    </div>
                }
                {booked === "past/none" &&
                    <div>
                        <div className='Book_emptyWrap'>
                            <h2 className='Book_emptyH2'>Bookings</h2>
                            <div className='Book_emptySub'>
                                Looks like you have no bookings. Would you like to book this spot?
                            </div>
                            <div className='Book_addErr'>
                                {errors?.map((error, idx) => {
                                    return (
                                        <div key={error} id='alignIndSignup'>
                                            <span>
                                                <img id='errorImgSignup' src={exclImg}></img>
                                            </span>
                                            <div className='oneErrorDivSignup' key={idx}>{error}</div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='Book_emptyTimeCenterAdd'>


                                <div className='Book_editWrapLow'>
                                    <input
                                        onKeyDown={(e) => e.preventDefault()}
                                        required={true}
                                        className='Book_editEle'
                                        min={min}
                                        type="date"
                                        value={addStart}
                                        onChange={(e) => setAddStart(e.target.value)}
                                    ></input>

                                    <div className='Book_editArrow'>→</div>
                                    <input
                                        onKeyDown={(e) => e.preventDefault()}
                                        required={true}
                                        min={min}
                                        className='Book_editEle'
                                        type="date"
                                        value={addEnd}
                                        onChange={(e) => setAddEnd(e.target.value)}
                                    ></input>
                                    <div className='Book_addButton revEditButton' onClick={handleAdd}> Add</div>
                                </div>

                            </div>
                        </div>
                    </div>
                }
                {booked === "present" &&
                    <div className='Book_emptyWrap'>
                        <h2 className='Book_emptyH2'>Bookings</h2>
                        <div className='Book_emptySub'>
                            Looks like you are currently staying here. Enjoy!
                        </div>
                        <div className='Book_emptyTimeCenter'>
                            <div className='Book_emptyTime'>{userBooking.startDate}</div>
                            <div className='Book_emptyTime Book_emptyTimeArrow'>↓</div>
                            <div className='Book_emptyTime'>{userBooking.endDate}</div>
                        </div>
                    </div>
                }
                {booked === "future" &&
                    <div className='Book_emptyWrap'>
                        <h2 className='Book_emptyH2'>Bookings</h2>
                        <div className='Book_emptySub'>
                            Looks like you have already booked this location for the following times:
                        </div>
                        <div className='Book_emptyTimeCenter'>
                            <div className='Book_emptyTime'>{userBooking.startDate}</div>
                            <div className='Book_emptyTime Book_emptyTimeArrow'>↓</div>
                            <div className='Book_emptyTime'>{userBooking.endDate}</div>
                        </div>
                        <div className='Book_emptySub'> Would you like to edit or delete this booking?</div>
                        <div className='Book_emptyButtonWrap'>
                            <div className='Book_button revEditButton' onClick={() => {
                                setErrors([])
                                setDeleteClick(false)
                                setEditClick(!editClick)
                                setNewStart(userBooking?.startDate)
                                setNewEnd(userBooking?.endDate)
                            }}> Edit</div>
                            <div className='Book_button revEditButton' onClick={() => {
                                setEditClick(false)
                                setDeleteClick(!deleteClick)
                            }}> {!deleteClick ? "Delete" : "Go Back"}</div>
                        </div>
                        {!editClick && !deleteClick && <div className='Book_editSpacer'></div>}
                        {deleteClick &&
                            <div className=' Book_deleteWrap'>
                                <div> Are you sure?</div>
                                <div className='Book_deleteButton revEditButton' onClick={handleDelete}>Delete</div>
                                <div className='Book_saveButton revEditButton' onClick={() => setDeleteClick(false)}>Cancel</div>
                            </div>
                        }
                        {editClick &&
                            <div className='Book_editWrap'>
                                {errors?.map((error, idx) => {
                                    return (
                                        <div key={error} id='alignIndSignup'>
                                            <span>
                                                <img id='errorImgSignup' src={exclImg}></img>
                                            </span>
                                            <div className='oneErrorDivSignup' key={idx}>{error}</div>
                                        </div>
                                    )
                                })}
                                <div className='Book_editWrapLow'>
                                    <input
                                        onKeyDown={(e) => e.preventDefault()}
                                        required={true}
                                        className='Book_editEle'
                                        min={min}
                                        type="date"
                                        value={newStart}
                                        onChange={(e) => setNewStart(e.target.value)}
                                    ></input>

                                    <div className='Book_editArrow'>→</div>
                                    <input
                                        onKeyDown={(e) => e.preventDefault()}
                                        required={true}
                                        min={min}
                                        className='Book_editEle'
                                        type="date"
                                        value={newEnd}
                                        onChange={(e) => setNewEnd(e.target.value)}
                                    ></input>
                                    <div className='Book_saveButton revEditButton' onClick={handleSave}> Save</div>
                                </div>
                            </div>
                        }

                    </div>
                }
            </div>
            {showLoginModal && (
                <Modal onClose={() => {
                    setShowLoginModal(false)
                }}>
                    <LoginForm />
                </Modal>
            )}
            {showSignUpModal && (
                <Modal onClose={() => {
                    // setModalOn(false)
                    setShowSignUpModal(false)

                }}>
                    <SignupForm />
                </Modal>
            )}
        </>

    )
}

export default Book
