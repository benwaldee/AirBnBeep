import './Book.css'
import { getAllSpotsThunk } from "../../store/spots"
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { updateUserBookingThunk, deleteUserBookingThunk } from "../../store/bookings"
import exclImg from '../LoginFormModal/excl.PNG'

const Book = ({ userBooking, booked, setBooked, setToggleRender, toggleRender }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [editClick, setEditClick] = useState(false)
    const [deleteClick, setDeleteClick] = useState(false)
    const [newStart, setNewStart] = useState(userBooking?.startDate)
    const [newEnd, setNewEnd] = useState(userBooking?.endDate)
    const [errors, setErrors] = useState([])

    const today = new Date();
    let min = today.toISOString().slice(0, 10)
    console.log("min", min)

    const handleSave = () => {
        setErrors([])

        dispatch(updateUserBookingThunk(Number(userBooking.id), { startDate: newStart, endDate: newEnd }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    console.log(data.errors)
                    setErrors([Object.values(data.errors)[0]])
                    setNewStart(userBooking.startDate)
                    setNewEnd(userBooking.endDate)


                } else {
                    setToggleRender(!toggleRender)
                    setEditClick(false)
                }
            })
    }

    const handleDelete = () => {

        dispatch(deleteUserBookingThunk(Number(userBooking.id)))
        setToggleRender(!toggleRender)
        setBooked("past/none")

    }

    console.log("booked", booked)

    return (

        <div className="Book_outer">
            {booked === "past/none" &&
                <div>
                    <div className='Book_emptyWrap'>
                        <h2 className='Book_emptyH2'>Bookings</h2>
                        <div className='Book_emptySub'>
                            Looks like you have no bookings. Would you like to book this spot?
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
                                    onkeydown="return false"
                                    required={true}
                                    className='Book_editEle'
                                    min={min}
                                    type="date"
                                    value={newStart}
                                    onChange={(e) => setNewStart(e.target.value)}
                                ></input>

                                <div className='Book_editArrow'>→</div>
                                <input
                                    onkeydown="return false"
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

    )
}

export default Book
