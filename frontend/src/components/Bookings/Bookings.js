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


    const today = new Date()
    let min = today.toISOString().slice(0, 8)
    let last = Number(today.toISOString().slice(8, 10)) + 1
    min = min + last

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
            .filter(booking => booking.startDate > min)
            .sort((a, b) => a.startDate.split("-").join("") - b.startDate.split("-").join(""))
    }

    const handleBookingClick = (id) => {
        // console.log(id)
        history.push(`/spots/${id}`)
    }

    // console.log(Number("2022-10-14".split("-").join("")))

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
                    <div key={booking?.id} className='Bookings_card' onClick={() => handleBookingClick(booking?.spotId)}>
                        <img className='Bookings_cardImage' src={booking?.Spot?.previewImage}></img>
                        <div className='Bookings_cardLow'>
                            <div className='Bookings_cardSpot'>{booking?.Spot?.name} </div>
                            <div className='Bookings_cardLocation'>{booking?.Spot?.city},{booking?.Spot?.state}</div>
                            <div className='Bookings_cardStart'><span className='bolded'> CHECK IN:</span> {booking?.startDate?.slice(0, 10)}</div>
                            <div className='Bookings_cardEnd'><span className='bolded'> CHECK OUT:</span> {booking?.endDate?.slice(0, 10)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Bookings
