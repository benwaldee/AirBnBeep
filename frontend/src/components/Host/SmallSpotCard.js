
import React, { useState, useEffect } from 'react';
import './SmallSpotCard.css'
import star from '../AllSpotsGrid/star.PNG'
import { deleteSpotThunk } from '../../store/spots';
import { useDispatch } from 'react-redux';

const SmallSpotCard = ({ spot, setRenderToggle, renderToggle }) => {

    const dispatch = useDispatch()


    const deleteSpot = () => {

        dispatch(deleteSpotThunk(spot.id))
        setRenderToggle(!renderToggle)

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
                    <div id='deleteSpot' onClick={deleteSpot}>Delete</div>
                </div>
            </div>
        </div>
    )
}

export default SmallSpotCard
