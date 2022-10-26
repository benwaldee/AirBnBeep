import './Book.css'
import { getAllSpotsThunk } from "../../store/spots"
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

const Book = ({ userBooking, booked, setBooked, endDate, setEndDate, startDate, setStartDate }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [editClick, setEditClick] = useState(false)
    const [deleteClick, setDeleteClick] = useState(false)
    const [newStart, setNewStart] = useState(startDate || "")
    const [newEnd, setNewEnd] = useState(endDate || "")
    const [errors, setErrors] = useState()

    const handleSave = () => {


        dispatch(updateUserBookingThunk({}))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                    for (let error of data.errors) {
                        if (error === 'Password must be 6 characters or more.') {
                            setPassword('')
                            setConfirmPassword('')
                        }
                    }
                }


                console.log(newEnd, newStart)

            })
    }

    return (

        <div className="Book_outer">
            {!booked &&
                <div className='Book_formWrap'></div>
            }
            {booked &&
                <div className='Book_emptyWrap'>
                    <h2 className='Book_emptyH2'>Bookings</h2>
                    <div className='Book_emptySub'>
                        Looks like you have already booked this location for the following times:
                    </div>
                    <div className='Book_emptyTimeCenter'>
                        <div className='Book_emptyTime'>{startDate}</div>
                        <div className='Book_emptyTime Book_emptyTimeArrow'>↓</div>
                        <div className='Book_emptyTime'>{endDate}</div>
                    </div>
                    <div className='Book_emptySub'> Would you like to edit or delete this booking?</div>
                    <div className='Book_emptyButtonWrap'>
                        <div className='Book_button revEditButton' onClick={() => setEditClick(!editClick)}> Edit</div>
                        <div className='Book_button revEditButton' onClick={() => setDeleteClick(!deleteClick)}> Delete</div>
                    </div>

                    {editClick &&
                        <div className='Book_editWrap'>
                            <input
                                className='Book_editEle'
                                type="date"
                                value={newStart}
                                onChange={(e) => setNewStart(e.target.value)}
                            ></input>

                            <div className='Book_editArrow'>→</div>
                            <input
                                className='Book_editEle'
                                type="date"
                                value={newEnd}
                                onChange={(e) => setNewEnd(e.target.value)}
                            ></input>
                            <div className='Book_saveButton revEditButton' onClick={handleSave}> Save</div>
                        </div>
                    }

                </div>
            }
        </div>

    )
}

export default Book
