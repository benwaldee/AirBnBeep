import { getAllSpotsThunk } from "../../store/spots"
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import './SpotCard.css'
import star from './star.PNG'
import { useHistory } from 'react-router-dom'
import { Modal, useModalContext } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';

const SpotCard = ({ spot, sessionUser }) => {

    const { showLoginFormSpotCard, setShowLoginFormSpotCard } = useModalContext();

    const history = useHistory()

    const openSpotIDPage = () => {

        if (!sessionUser) {
            // alert('login first')

            setShowLoginFormSpotCard(true)
            return
        }

        history.push(`/spots/${spot.id}`)
    }

    return (
        <>
            <div id='outerSpotCardDiv' onClick={openSpotIDPage}>
                <div id='innerSpotCardDiv'>
                    <img className='spotCardImage' src={spot.previewImage}></img>
                    <div className='spotCardTitleWrapper'>
                        <div className='spotCardLocation'>{spot.city}, {spot.state} </div>
                        <div className='spotCardRatingWrapper'>
                            <img className='spotCardStar' src={star}></img>
                            <div className="spotCardAvgRating">{spot.avgRating}</div>
                        </div>
                    </div>
                    <div className='spotCardName' >{spot.name}</div>
                    <div className="priceWrapperSpotCard">
                        <div className='spotCardPrice'>${spot.price} </div>
                        <div>night</div>
                    </div>
                </div>



            </div>

            {!sessionUser && showLoginFormSpotCard && (
                <Modal onClose={() => {
                    setShowLoginFormSpotCard(false)

                }}>
                    <LoginForm />
                </Modal>
            )}
        </>
    )
}

export default SpotCard
