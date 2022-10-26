import './Bookings.css'
import { getUserBookingsThunk } from "../../store/bookings"
import { getAllSpotsThunk } from "../../store/spots"
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

const Bookings = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (!sessionUser) {
            history.push('/')
        }

        dispatch(getAllSpotsThunk())
        dispatch(getUserBookingsThunk())

    }, [])

    let userBookings = useSelector(state => state?.bookings?.userBookings)
    if (userBookings) {
        userBookings = Object.values(userBookings)
    }



    return (
        <>
            <div className="Bookings_addSpotOuter">
                <div className='Bookings_addSpotInner'>
                    <div className="Bookings_today">Your bookings.</div>
                    <div className="Bookings_hostSoon">Below are all of your current bookings. Enjoy your stay! </div>

                </div>
            </div>
            <div className="Bookings_outer">
                {userBookings?.map(booking => (
                    <div key={booking.id} className='Bookings_card'>
                        <img src={booking.Spot.previewImage}></img>
                        <div className='Bookings_cardLow'>
                            <div className='Bookings_cardSpot'>{booking.Spot.name}</div>
                            <div className='Bookings_cardStart'>{booking.startDate.slice(0, 10)}</div>
                            <div className='Bookings_cardEnd'>{booking.endDate.slice(0, 10)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Bookings
