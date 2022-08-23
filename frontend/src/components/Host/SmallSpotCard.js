
import React, { useState, useEffect } from 'react';
import './SmallSpotCard.css'
import star from '../AllSpotsGrid/star.PNG'
import { deleteSpotThunk } from '../../store/spots';
import { useDispatch } from 'react-redux';
import { Alert } from 'react'

const SmallSpotCard = ({ spot, setRenderToggle, renderToggle }) => {

    const [clickedDelete, setClickedDelete] = useState(false)

    const dispatch = useDispatch()


    const deleteSpot = () => {

        dispatch(deleteSpotThunk(spot.id))
        setRenderToggle(!renderToggle)
        setClickedDelete(false)

    }

    return (

        <div id='outerSmallSpotCardDiv'>
            <div id='innerSmallSpotCardDiv'>
                <img className='smallSpotCardImage' src={spot.previewImage}></img>
                <div className='smallSpotCardTitleWrapper'>
                    <div className='smallSpotCardLocation'>{spot.city}, {spot.state} </div>
                    <div className='smallSpotCardRatingWrapper'>
                        <img className='smallSpotCardStar' src={star}></img>
                        <div className="smallSpotCardAvgRating">{spot.avgRating}</div>
                    </div>
                </div>
                <div className='smallSpotCardName' >{spot.name}</div>
                <div className="priceWrapperSmallSpotCard">
                    <div className='smallSpotCardPrice'>${spot.price} </div>
                    <div>night</div>
                </div>
                <div className='spotButtons'>
                    <div id='editSpot'>Edit</div>
                    {!clickedDelete && <div className='deleteSpot' onClick={() => setClickedDelete(true)}>Delete</div>}
                    {clickedDelete && <div className='deleteSpot' onClick={deleteSpot}>DELETE</div>}
                    {clickedDelete && <div className='cancelDeleteSpot' onClick={() => setClickedDelete(false)}>Cancel</div>}


                </div>
            </div>
        </div>
    )
}

export default SmallSpotCard
