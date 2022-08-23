import './Host.css'
import { getUserSpotsThunk } from "../../store/spots"
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';


const Host = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserSpotsThunk())
    }, [])

    let userSpotObj = useSelector((state) => state?.spots?.allUserSpots)

    let userSpotArr
    if (userSpotObj) { userSpotArr = Object.values(userSpotObj) }

    return (
        <div className="addSpotOuter">
            <div className='addSpotInner'>
                <div className="today">Start today.</div>
                <div className="hostSoon">List your mobile spot today! Just add a few details to create a dream getaway. </div>
                <div className='listingButton'>Add a listing</div>
            </div>
        </div>
    )
}

export default Host
