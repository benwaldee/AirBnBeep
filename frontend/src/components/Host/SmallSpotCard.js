
import React, { useState, useEffect } from 'react';
import './SmallSpotCard.css'
import star from '../AllSpotsGrid/star.PNG'
import { deleteSpotThunk } from '../../store/spots';
import { useDispatch } from 'react-redux';
import { Alert } from 'react'

const SmallSpotCard = ({ spot, setRenderToggle, renderToggle, clickedEdit, setClickedEdit, showAddSpot, setShowAddSpot }) => {

    const [clickedDelete, setClickedDelete] = useState(false)


    const dispatch = useDispatch()


    const deleteSpot = () => {

        dispatch(deleteSpotThunk(spot.id))
        setRenderToggle(!renderToggle)
        setClickedDelete(false)

    }

    const clickingEdit = () => {
        setShowAddSpot(false)
        setClickedDelete(false)

        if (clickedEdit) {
            return
        }
        else setClickedEdit(spot.id)
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
                    <div id='editSpot' onClick={clickingEdit}>Edit</div>
                    {!clickedDelete && <div className='deleteSpot' onClick={() => {
                        setClickedDelete(true)
                        setClickedEdit(false)
                    }}>Delete</div>}
                    {clickedDelete && <div className='deleteSpot' onClick={deleteSpot}>Really?</div>}
                    {clickedDelete && <div className='cancelDeleteSpot' onClick={() => setClickedDelete(false)}>Cancel</div>}
                </div>
            </div>
        </div>
    )
}

export default SmallSpotCard
